import React, { useState } from "react";
import { Button } from "./ui/button";
import { DollarSign, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import FileUploadComponent from "./FileUploadComponent";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { fileSchema } from "@/src/types/file";
import { Badge } from "./ui/badge";
import { useToast } from "./ui/use-toast";
import { GET_USER_FILES } from "@/src/types/queries";
import FileUploadCard from "./FileUploadCard";

const AudioTranscriptTab = () => {
  const { data } = useSession();
  const { toast } = useToast();

  const { data: Files, isLoading } = useQuery(
    GET_USER_FILES,
    async () => {
      try {
        const res = await fetch("api/get-user-files", {
          method: "POST",
          body: JSON.stringify({
            userId: data?.user?.id,
          }),
        });
        const parsedBody = await res.json();
        return fileSchema.parse(parsedBody.files);
      } catch (err) {
        toast({
          title: "Error Encountered",
          description: "Unable to fetch files",
        });
      }
      return [];
    },
    {
      // The query will not execute until the userId exists
      enabled: !!data?.user?.id,
      refetchInterval: 10000,
    }
  );

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex justify-between ">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Audio Transcript
            </h2>
            <p className="text-sm text-muted-foreground">
              Previous Transcribed Files
            </p>
          </div>
        </div>
        <FileUploadComponent />
      </div>
      <div>
        {isLoading ? (
          <div className="mx-auto mt-10 flex items-center justify-center">
            <ClipLoader size={40} color="black" speedMultiplier={0.5} />
            <p className="ml-4 ">loading...</p>
          </div>
        ) : (
          <div>
            {Files?.sort((a, b) => {
              if (a.startedprocessing > b.startedprocessing) {
                return -1;
              }
              if (a.startedprocessing < b.startedprocessing) {
                return 1;
              }
              return 0;
            }).map((item) => {
              return <FileUploadCard key={item.id} item={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioTranscriptTab;
