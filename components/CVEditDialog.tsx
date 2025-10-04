"use client";

import { useState } from "react";
import { CVData } from "@/types/cv";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CVEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cvData: CVData;
  onSave: (updatedData: CVData) => void;
}

export default function CVEditDialog({
  open,
  onOpenChange,
  cvData,
  onSave,
}: CVEditDialogProps) {
  const [editedData, setEditedData] = useState<CVData>(cvData);

  const handleSave = () => {
    onSave(editedData);
    toast.success("Changes saved successfully!", {
      description: "Your resume has been updated.",
    });
    onOpenChange(false);
  };

  const addExperience = () => {
    setEditedData({
      ...editedData,
      experience: [
        ...editedData.experience,
        {
          id: `exp-${Date.now()}`,
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: [""],
        },
      ],
    });
  };

  const removeExperience = (id: string) => {
    setEditedData({
      ...editedData,
      experience: editedData.experience.filter((exp) => exp.id !== id),
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setEditedData({
      ...editedData,
      experience: editedData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Your Resume</DialogTitle>
          <DialogDescription>
            Make changes to your resume below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={editedData.personalInfo.fullName}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      personalInfo: {
                        ...editedData.personalInfo,
                        fullName: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedData.personalInfo.email}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      personalInfo: {
                        ...editedData.personalInfo,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedData.personalInfo.phone}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      personalInfo: {
                        ...editedData.personalInfo,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editedData.personalInfo.location}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      personalInfo: {
                        ...editedData.personalInfo,
                        location: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={editedData.summary || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, summary: e.target.value })
              }
              rows={4}
            />
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Experience</h3>
              <Button onClick={addExperience} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>

            {editedData.experience.map((exp, index) => (
              <div key={exp.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, "position", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(exp.id, "location", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, "startDate", e.target.value)
                      }
                      placeholder="January 2020"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description (one per line)</Label>
                  <Textarea
                    value={exp.description.join("\n")}
                    onChange={(e) =>
                      updateExperience(
                        exp.id,
                        "description",
                        e.target.value.split("\n").filter((line) => line.trim())
                      )
                    }
                    rows={3}
                    placeholder="• Achievement 1&#10;• Achievement 2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
