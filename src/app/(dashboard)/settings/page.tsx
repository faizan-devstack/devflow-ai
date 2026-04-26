"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession, signOut, signIn } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  PiUser,
  PiLockKey,
  PiPlugs,
  PiWarning,
  PiGoogleLogo,
  PiCaretRight,
  PiSignOut,
  PiTrash,
  PiSpinner,
  PiEye,
  PiEyeSlash,
} from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ─── Schemas ──────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// ─── Components ───────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const user = session?.user;

  // Form for Profile
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  // Form for Password
  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onUpdateProfile = async (values: z.infer<typeof profileSchema>) => {
    setIsUpdatingProfile(true);
    try {
      const res = await fetch("/api/user/update-profile", {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success("Profile updated successfully");
        router.refresh();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onUpdatePassword = async (values: z.infer<typeof passwordSchema>) => {
    setIsUpdatingPassword(true);
    try {
      const res = await fetch("/api/user/update-password", {
        method: "PATCH",
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });
      if (res.ok) {
        toast.success("Password updated successfully");
        passwordForm.reset();
      } else {
        const error = await res.text();
        toast.error(error || "Failed to update password");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") return;
    setIsDeletingAccount(true);
    try {
      // Logic for account deletion
      toast.info("Account deletion is not yet fully implemented in the backend");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <PiSpinner className="w-8 h-8 animate-spin text-primary-solid" />
      </div>
    );
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const passwordValue = passwordForm.watch("newPassword", "");
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return 0;
    if (pwd.length < 6) return 1;
    if (pwd.length < 8) return 2;
    const hasMixed = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);
    if (pwd.length >= 8 && !hasMixed) return 3;
    if (pwd.length >= 8 && hasMixed) return 4;
    return 0;
  };
  const strength = getPasswordStrength(passwordValue);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-canvas-text-contrast font-semibold text-2xl">Account Settings</h1>
        <p className="text-canvas-text text-sm mt-1">Manage your profile, security, and account preferences.</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Card 1: Profile */}
        <motion.div variants={itemVariants}>
          <Card className="bg-canvas-base border-canvas-border/50 overflow-hidden hover:-translate-y-0.5 transition-transform duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <PiUser className="text-primary-solid" size={20} />
                <h2 className="text-canvas-text-contrast font-semibold">Profile</h2>
              </div>

              <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6">
                <div className="w-14 h-14 rounded-full bg-primary-bg text-primary-text font-semibold text-lg flex items-center justify-center shrink-0 border border-canvas-border/50">
                  {initials}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-canvas-text-contrast font-semibold">{user?.name}</p>
                  <p className="text-canvas-text text-sm">{user?.email}</p>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mt-4 border-canvas-border/50 text-canvas-text hover:bg-canvas-subtle">
                        Edit profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-canvas-base border-canvas-border/50 sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-canvas-text-contrast">Edit profile</DialogTitle>
                        <DialogDescription className="text-canvas-text">
                          Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-canvas-text-contrast">Name</label>
                          <Input
                            {...profileForm.register("name")}
                            className="border-canvas-border/50 bg-canvas-base text-canvas-text-contrast focus:ring-primary-solid"
                          />
                          {profileForm.formState.errors.name && (
                            <p className="text-xs text-alert-text">{profileForm.formState.errors.name.message}</p>
                          )}
                        </div>
                        <DialogFooter>
                          <Button 
                            type="submit" 
                            disabled={isUpdatingProfile}
                            className="bg-primary-solid text-primary-on-primary hover:bg-primary-solid-hover"
                          >
                            {isUpdatingProfile && <PiSpinner className="mr-2 h-4 w-4 animate-spin" />}
                            Save changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Card 2: Security */}
        <motion.div variants={itemVariants}>
          <Card className="bg-canvas-base border-canvas-border/50 overflow-hidden hover:-translate-y-0.5 transition-transform duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <PiLockKey className="text-primary-solid" size={20} />
                <h2 className="text-canvas-text-contrast font-semibold">Security</h2>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full flex items-center justify-between py-2 group">
                    <span className="text-canvas-text group-hover:text-canvas-text-contrast transition-colors text-sm">Change password</span>
                    <PiCaretRight className="text-canvas-text group-hover:text-canvas-text-contrast transition-colors" />
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-canvas-base border-canvas-border/50 sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-canvas-text-contrast">Change password</DialogTitle>
                    <DialogDescription className="text-canvas-text">
                      Update your account password.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={passwordForm.handleSubmit(onUpdatePassword)} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-canvas-text-contrast">Current password</label>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          {...passwordForm.register("currentPassword")}
                          className="border-canvas-border/50 bg-canvas-base text-canvas-text-contrast focus:ring-primary-solid pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-canvas-text"
                        >
                          {showCurrentPassword ? <PiEyeSlash size={16} /> : <PiEye size={16} />}
                        </button>
                      </div>
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-xs text-alert-text">{passwordForm.formState.errors.currentPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-canvas-text-contrast">New password</label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          {...passwordForm.register("newPassword")}
                          className="border-canvas-border/50 bg-canvas-base text-canvas-text-contrast focus:ring-primary-solid pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-canvas-text"
                        >
                          {showNewPassword ? <PiEyeSlash size={16} /> : <PiEye size={16} />}
                        </button>
                      </div>
                      {passwordValue.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className={cn(
                                  "h-1 flex-1 rounded-full",
                                  i <= strength
                                    ? strength === 1 ? "bg-alert-solid" : strength === 2 ? "bg-warning-solid" : strength === 3 ? "bg-primary-solid" : "bg-success-solid"
                                    : "bg-canvas-border/50"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-xs text-alert-text">{passwordForm.formState.errors.newPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-canvas-text-contrast">Confirm new password</label>
                      <Input
                        type="password"
                        {...passwordForm.register("confirmPassword")}
                        className="border-canvas-border/50 bg-canvas-base text-canvas-text-contrast focus:ring-primary-solid"
                      />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-xs text-alert-text">{passwordForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <DialogFooter>
                      <Button 
                        type="submit" 
                        disabled={isUpdatingPassword}
                        className="bg-primary-solid text-primary-on-primary hover:bg-primary-solid-hover"
                      >
                        {isUpdatingPassword && <PiSpinner className="mr-2 h-4 w-4 animate-spin" />}
                        Update password
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </motion.div>

        {/* Card 3: Connected Accounts */}
        <motion.div variants={itemVariants}>
          <Card className="bg-canvas-base border-canvas-border/50 overflow-hidden hover:-translate-y-0.5 transition-transform duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <PiPlugs className="text-primary-solid" size={20} />
                <h2 className="text-canvas-text-contrast font-semibold">Connected Accounts</h2>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-canvas-border/50 flex items-center justify-center bg-canvas-subtle">
                    <PiGoogleLogo size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-canvas-text-contrast">Google</p>
                    <p className="text-xs text-canvas-text">Sign in with Google</p>
                  </div>
                </div>
                
                {/* Check if google is connected - this would need session check for linked accounts */}
                <Badge variant="outline" className="bg-success-bg text-success-text border-success-border/50">
                  Connected
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Card 4: Danger Zone */}
        <motion.div variants={itemVariants}>
          <Card className="bg-canvas-base border-alert-border/50 overflow-hidden hover:-translate-y-0.5 transition-transform duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <PiWarning className="text-alert-solid" size={20} />
                <h2 className="text-canvas-text-contrast font-semibold">Danger Zone</h2>
              </div>

              <button 
                onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/") } })}
                className="w-full flex items-center gap-3 py-2 text-canvas-text hover:text-canvas-text-contrast transition-colors group"
              >
                <PiSignOut size={18} />
                <span className="text-sm">Sign out</span>
              </button>

              <Separator className="my-3 bg-canvas-border/50" />

              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full flex items-center gap-3 py-2 text-alert-text hover:text-alert-solid transition-colors group">
                    <PiTrash size={18} />
                    <span className="text-sm font-medium">Delete account</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-canvas-base border-canvas-border/50 sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-alert-text">Delete your account</DialogTitle>
                    <DialogDescription className="text-canvas-text">
                      This action is permanent and cannot be undone. All your data will be deleted.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-canvas-text">Please type <span className="font-bold text-canvas-text-contrast">DELETE</span> to confirm.</p>
                    <Input
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder="DELETE"
                      className="border-canvas-border/50 bg-canvas-base text-canvas-text-contrast focus:ring-alert-solid"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      disabled={deleteConfirmation !== "DELETE" || isDeletingAccount}
                      onClick={handleDeleteAccount}
                      className="bg-alert-solid text-white hover:bg-alert-solid/90"
                    >
                      {isDeletingAccount && <PiSpinner className="mr-2 h-4 w-4 animate-spin" />}
                      Delete account
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
