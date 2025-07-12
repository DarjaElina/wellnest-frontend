export type MoodType = {
  label: string;
  icon: string;
};

export type MoodSet = {
  name: string;
  moods: MoodType[];
};

export const moodSets: MoodSet[] = [
  {
    name: "Shiba Inu",
    moods: [
      {
        label: "Peace",
        icon: "/src/assets/moods/shiba-mood/peace.png",
      },
      {
        label: "Love",
        icon: "/src/assets/moods/shiba-mood/love.png",
      },
      {
        label: "Cool",
        icon: "/src/assets/moods/shiba-mood/cool.png",
      },
      { label: "Cry", icon: "/src/assets/moods/shiba-mood/cry.png" },
      {
        label: "Laughing",
        icon: "/src/assets/moods/shiba-mood/laughing.png",
      },
    ],
  },
  {
    name: "Cat",
    moods: [
      {
        label: "Peace",
        icon: "/src/assets/moods/cat-mood/peace.png",
      },
      {
        label: "Love",
        icon: "/src/assets/moods/cat-mood/love.png",
      },
      {
        label: "Cool",
        icon: "/src/assets/moods/cat-mood/cool.png",
      },
      { label: "Cry", icon: "/src/assets/moods/cat-mood/cry.png" },
      {
        label: "Laughing",
        icon: "/src/assets/moods/cat-mood/laughing.png",
      },
    ],
  },
  {
    name: "Koala",
    moods: [
      {
        label: "Peace",
        icon: "/src/assets/moods/koala-mood/peace.png",
      },
      {
        label: "Love",
        icon: "/src/assets/moods/koala-mood/love.png",
      },
      {
        label: "Cool",
        icon: "/src/assets/moods/koala-mood/cool.png",
      },
      { label: "Cry", icon: "/src/assets/moods/koala-mood/cry.png" },
      {
        label: "Laughing",
        icon: "/src/assets/moods/koala-mood/laughing.png",
      },
    ],
  },
  {
    name: "Emoji",
    moods: [
      {
        label: "Peace",
        icon: "/src/assets/moods/emoji-mood/peace.png",
      },
      {
        label: "Love",
        icon: "/src/assets/moods/emoji-mood/love.png",
      },
      {
        label: "Cool",
        icon: "/src/assets/moods/emoji-mood/cool.png",
      },
      { label: "Cry", icon: "/src/assets/moods/emoji-mood/cry.png" },
      {
        label: "Laughing",
        icon: "/src/assets/moods/emoji-mood/laughing.png",
      },
    ],
  },
];

// <a href="https://www.flaticon.com/free-icons/scared" title="scared icons">Scared icons created by André Luiz Gollo - Flaticon</a>
// for emoji attributions so i can find them later

// <a href="https://www.flaticon.com/free-icons/shiba-inu" title="shiba inu icons">Shiba inu icons created by AomAm - Flaticon</a>
// for coala, dog and cat emojis
