import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function NotificationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Configure your notification preferences here.
        </p>
      </CardContent>
    </Card>
  );
}
