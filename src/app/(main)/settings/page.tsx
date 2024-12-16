"use client";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const utils = api.useUtils();

  // Get profile settings
  const { data: profileData, isLoading } = api.profile.getSettings.useQuery();

  // Update mutations for each section
  const updateUser = api.profile.updateUser.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User information updated successfully",
      });
      void utils.profile.getSettings.invalidate();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const updateProfileInfo = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile information updated successfully",
      });
      void utils.profile.getSettings.invalidate();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const updateSocial = api.profile.updateSocial.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Social links updated successfully",
      });
      void utils.profile.getSettings.invalidate();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const form = useForm({
    defaultValues: {
      user: {
        username: "",
        email: "",
        name: "",
        profileColor: "#5877ba",
      },
      profile: {
        bio: "",
        location: "",
        currentLearning: "",
        availableFor: "",
        skills: "",
        currentProject: "",
        pronouns: false,
        work: "",
        education: "",
      },
      social: {
        website: "",
        twitter: "",
        github: "",
        linkedin: "",
        facebook: "",
      },
    },
  });

  // Update form when data is loaded
  useEffect(() => {
    if (profileData) {
      form.reset({
        user: {
          username: profileData.username ?? "",
          email: profileData.email ?? "",
          name: profileData.name ?? "",
          profileColor: profileData.profileColor,
        },
        profile: profileData.profile ?? {},
        social: profileData.social ?? {},
      });
    }
  }, [profileData, form]);

  const onSubmit = form.handleSubmit((data) => {
    // Update each section separately
    const { user, profile, social } = data;
    const formValues = form.getValues();

    // Helper function to get changed fields
    const getChangedFields = (current: any, initial: any, section: string) => {
      const changed: Record<string, any> = {};
      Object.keys(current).forEach((key) => {
        // Only include field if it's different from initial value and not empty
        if (current[key] !== initial[section]?.[key] && current[key] !== "") {
          changed[key] = current[key];
        }
      });
      return changed;
    };

    // Get initial values from profileData
    const initialValues = {
      user: {
        username: profileData?.username ?? "",
        email: profileData?.email ?? "",
        name: profileData?.name ?? "",
        profileColor: profileData?.profileColor ?? "#5877ba",
      },
      profile: profileData?.profile ?? {},
      social: profileData?.social ?? {},
    };

    // Get only changed fields for each section
    const changedUserFields = getChangedFields(user, initialValues, "user");
    const changedProfileFields = getChangedFields(
      profile,
      initialValues,
      "profile",
    );
    const changedSocialFields = getChangedFields(
      social,
      initialValues,
      "social",
    );

    // Only update sections with changes
    if (Object.keys(changedUserFields).length > 0) {
      updateUser.mutate(changedUserFields);
    }

    if (Object.keys(changedProfileFields).length > 0) {
      updateProfileInfo.mutate(changedProfileFields);
    }

    if (Object.keys(changedSocialFields).length > 0) {
      updateSocial.mutate(changedSocialFields);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="col-span-12 space-y-8 md:col-span-10 md:col-start-2"
    >
      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Twitter URL</label>
            <Input
              {...form.register("social.twitter")}
              placeholder="https://twitter.com/yourusername"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub URL</label>
            <Input
              {...form.register("social.github")}
              placeholder="https://github.com/yourusername"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">LinkedIn URL</label>
            <Input
              {...form.register("social.linkedin")}
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Facebook URL</label>
            <Input
              {...form.register("social.facebook")}
              placeholder="https://facebook.com/yourusername"
            />
          </div>
        </CardContent>
      </Card>

      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            User Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input {...form.register("user.username")} placeholder="username" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              {...form.register("user.email")}
              type="email"
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              {...form.register("user.name")}
              placeholder="Your full name"
            />
          </div>
        </CardContent>
      </Card>

      {/* Basics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Personal Website</label>
            <Input
              {...form.register("social.website")}
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              {...form.register("profile.location")}
              placeholder="City, Country"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Input
              {...form.register("profile.bio")}
              placeholder="Tell us about yourself"
            />
          </div>
        </CardContent>
      </Card>

      {/* Coding Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Coding Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Currently Learning</label>
            <small className="-mt-1 text-xs text-gray-500">
              What technologies are you currently learning?
            </small>
            <Input
              {...form.register("profile.currentLearning")}
              placeholder="JavaScript"
            />
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Available For</label>
            <small className="-mt-1 text-xs text-gray-500">
              What kind of opportunities are you open to?
            </small>
            <Input
              {...form.register("profile.availableFor")}
              placeholder="Internships"
            />
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Skills</label>
            <small className="-mt-1 text-xs text-gray-500">
              Your technical skills (e.g., React, Node.js, Python)
            </small>
            <Input
              {...form.register("profile.skills")}
              placeholder="React, Node.js"
            />
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Current Projects</label>
            <small className="-mt-1 text-xs text-gray-500">
              What are you working on right now?
            </small>
            <Input
              {...form.register("profile.currentProject")}
              placeholder="Personal website"
            />
          </div>
        </CardContent>
      </Card>

      {/* Personal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Personal Pronouns</label>
            <Select
              onValueChange={(value) =>
                form.setValue("profile.pronouns", value === "true")
              }
              value={form.watch("profile.pronouns") ? "true" : "false"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your pronouns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Show on profile</SelectItem>
                <SelectItem value="false">Don't show</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Work & Education */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Work & Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Work Experience</label>
            <Input
              {...form.register("profile.work")}
              placeholder="Current or most recent position"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Education</label>
            <Input
              {...form.register("profile.education")}
              placeholder="Highest education qualification"
            />
          </div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Branding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Color</label>
            <div className="flex gap-4">
              <Input
                type="color"
                className="h-10 w-20"
                {...form.register("user.profileColor")}
              />
              <Input
                type="text"
                {...form.register("user.profileColor")}
                className="w-32"
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex justify-center py-4">
          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
            disabled={
              updateUser.isPending ||
              updateProfileInfo.isPending ||
              updateSocial.isPending
            }
          >
            {updateUser.isPending ||
            updateProfileInfo.isPending ||
            updateSocial.isPending
              ? "Saving..."
              : "Save Changes"}
          </button>
        </CardContent>
      </Card>
    </form>
  );
}
