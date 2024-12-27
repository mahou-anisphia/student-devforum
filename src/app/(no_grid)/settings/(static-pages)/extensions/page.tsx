import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function ExtensionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Extensions Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Manage your installed extensions and discover new ones here.
        </p>
      </CardContent>
    </Card>
  );
}
