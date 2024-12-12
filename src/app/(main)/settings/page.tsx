"use client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";

export default function SettingsPage() {
  const [color, setColor] = useState("#000000");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="col-span-12 space-y-8 md:col-span-10 md:col-start-2">
      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Twitter URL</label>
            <Input placeholder="https://twitter.com/yourusername" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub URL</label>
            <Input placeholder="https://github.com/yourusername" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">LinkedIn URL</label>
            <Input placeholder="https://linkedin.com/in/yourusername" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Facebook URL</label>
            <Input placeholder="https://facebook.com/yourusername" />
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
            <Input placeholder="username" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="email@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Your full name" />
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
            <Input placeholder="https://yourwebsite.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input placeholder="City, Country" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Input placeholder="Tell us about yourself" />
          </div>
        </CardContent>
      </Card>

      {/* Coding */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Coding Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Currently Learning</label>
            <Input placeholder="What technologies are you currently learning?" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Available For</label>
            <Input placeholder="What kind of opportunities are you open to?" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <Input placeholder="Your technical skills (e.g., React, Node.js, Python)" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Projects</label>
            <Input placeholder="What are you working on right now?" />
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your pronouns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="she/her">she/her</SelectItem>
                <SelectItem value="he/him">he/him</SelectItem>
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
            <Input placeholder="Current or most recent position" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Education</label>
            <Input placeholder="Highest education qualification" />
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
                value={color}
                onChange={handleColorChange}
              />
              <Input
                type="text"
                value={color}
                onChange={handleColorChange}
                className="w-32"
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
