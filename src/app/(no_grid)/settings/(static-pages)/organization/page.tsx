import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function OrganizationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Manage your organization settings and team members here.
        </p>
      </CardContent>
    </Card>
  );
}
