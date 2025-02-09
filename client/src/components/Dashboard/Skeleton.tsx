import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarMenuSkeleton } from "../ui/sidebar";
import { Card, CardContent, CardHeader } from "../ui/card";

export const DashboardSkeleton = () => {
  return (
    <>
      <div className="min-h-screen mx-auto mt-16">
        <main className="p-4 md:p-6 space-y-6">
          <Card className="w-full shadow-lg border-none">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="flex-grow space-y-4 w-full">
                  <div>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32 mt-2" />
                  </div>
                  <div className="flex gap-3">
                    <SidebarMenuSkeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
                <div className="hidden lg:block space-y-3">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <Card className="shadow-lg border-none">
                <CardHeader className="p-6">
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="mb-4">
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-8">
              <Card className="shadow-lg border-none">
                <CardHeader className="p-6">
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="mb-4">
                      <Skeleton className="h-32 w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
