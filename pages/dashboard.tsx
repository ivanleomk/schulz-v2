import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { useS3Upload } from "next-s3-upload";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const session = useSession();

  const [uploadingFile, setUploadingFile] = useState(false);
  let { uploadToS3 } = useS3Upload();

  const handleUpload = async () => {
    if (file === null) {
      alert("No File");
    }
    setUploadingFile(true);
    let { url, key } = await uploadToS3(file as File);

    const updateDb = await fetch("api/create-new-file", {
      method: "POST",
      body: JSON.stringify({
        url,
        key,
      }),
    });

    setUploadingFile(false);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
      <div>
        <p>Status: {session.status}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
      <Label htmlFor="Audio Transcript">Audio Transcript</Label>
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
  );
};

export default Dashboard;
