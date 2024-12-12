import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function CustomizationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customization Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Customize your experience with themes, layouts, and other preferences.
        </p>
      </CardContent>
    </Card>
  );
}
