import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { signOut, useSession } from "next-auth/react";
import { useS3Upload } from "next-s3-upload";
import { ClipLoader } from "react-spinners";
import { useToast } from "./ui/use-toast";
import { useQueryClient } from "react-query";
import { GET_USER_FILES } from "@/src/types/queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { PlusCircle } from "lucide-react";

const FileUploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  let { uploadToS3 } = useS3Upload();
  const [open, setOpen] = useState(false);
  const { data } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleUpload = async () => {
    const user = data?.user;
    const userId = user?.id;
    if (file === null) {
      alert("No File");
    }

    if (!user || !userId) {
      alert("No User");
    }
    setUploadingFile(true);
    let { url, key } = await uploadToS3(file as File);

    if (!url || !key) {
      toast({
        title: "Error Encountered",
        description: "Unable to upload file",
      });
      return;
    }

    const updateDb = await fetch("api/create-new-file", {
      method: "POST",
      body: JSON.stringify({
        url,
        key,
        userId,
      }),
    });

    setUploadingFile(false);
    toast({
      title: "Success",
      description:
        "Sucessfully Uploaded file - transcript should be avaliable soon",
    });
    queryClient.invalidateQueries({
      queryKey: GET_USER_FILES,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="text-md text-bold">Upload a File</p>
          </DialogTitle>
          <DialogDescription>
            <div className="text-sm text-gray-600"></div>
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto mt-10">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
            <Input
              id="Audio Transcript"
              type="file"
              accept=".mp3,.mp4"
              onChange={(e) => {
                const files = e?.target?.files;
                if (files && files.length > 0) {
                  setFile(files[0]);
                }
              }}
            />
            <p className="text-xs text-gray-400">
              Upload an audio transcript and we&apos;ll transcribe it all
            </p>
            <Button
              className="py-1 px-2 w-full"
              onClick={() => {
                handleUpload();
              }}
              variant="outline"
              disabled={uploadingFile}
            >
              {uploadingFile ? (
                <ClipLoader size={20} speedMultiplier={0.4} />
              ) : (
                "Upload Audio"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadComponent;
