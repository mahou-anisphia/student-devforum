"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

export function DisclaimerPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the disclaimer
    const hasSeenDisclaimer = localStorage.getItem("hasSeenDisclaimer");

    if (!hasSeenDisclaimer) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    // Save to localStorage so we don't show the popup again
    localStorage.setItem("hasSeenDisclaimer", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Important Disclaimer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 text-center">
          <p>
            This is <strong>not</strong> a phishing site or an official replica
            of Dev.to. This site does not expect any potential user beside the
            members of the lab.
          </p>
          <p>
            This is a small project built for testing newest technology
            integration and development processes.
          </p>
          <p className="font-semibold">
            We do not have any relations with Dev.to or its parent company.
          </p>
        </div>
        <DialogFooter className="flex justify-center sm:justify-center">
          <Button onClick={handleAccept}>I Understand</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
