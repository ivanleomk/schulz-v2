import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
type Props = {
  values: {
    value: string;
    label: string;
  }[];
};

const DashboardTabComponent = ({ values }: Props) => {
  const [currentTab, setCurrentTab] = useState(values?.at(0)?.value);

  return (
    <Tabs
      value={currentTab}
      onValueChange={(e) => {
        setCurrentTab(e);
      }}
      className="space-y-4"
    >
      <TabsList>
        {values?.map(({ label, value }) => {
          return (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value="Meeting Notes" className="mt-0 border-0 p-0">
        Meeting notes
        {/* <MeetingNotes /> */}
      </TabsContent>
      <TabsContent value="Audio Transcript" className="mt-0 border-0 p-0">
        Audio File Upload
        {/* <AudioFileUpload /> */}
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabComponent;
