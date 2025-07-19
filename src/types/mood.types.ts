export type MoodType = {
  label: string;
  iconUrl: string;
  id?: string;
  date?: string;
  note?: string;
};

export type MoodSetName = "Default";

export type MoodSet = {
  name: string;
  moods: MoodType[];
};

export const moodSets: MoodSet[] = [
  {
    name: "Default",
    moods: [
      {
        label: "calm",
        iconUrl: "/assets/moods/default/calm.png",
      },
      {
        label: "grateful",
        iconUrl: "/assets/moods/default/grateful.png",
      },
      {
        label: "okay",
        iconUrl: "/assets/moods/default/okay.png",
      },
      { label: "low", iconUrl: "/assets/moods/default/low.png" },
      {
        label: "stressed",
        iconUrl: "/assets/moods/default/stressed.png",
      },
    ],
  },
];

export type MoodDialogMode = "edit" | "auto-checkin" | "manual-checkin";
