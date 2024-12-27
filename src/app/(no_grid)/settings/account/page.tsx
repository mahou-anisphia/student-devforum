import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function AccountPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Manage your account settings and preferences here.
        </p>
      </CardContent>
    </Card>
  );
}
