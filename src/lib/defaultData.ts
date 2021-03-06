export const colorList = [
  ["#990000", "#CC0000", "#FF0000", "#FF3333", "#FF6666", "#FF9999"],
  ["#994C00", "#CC6600", "#FF8000", "#FF9933", "#FFB266", "#FFCC99"],
  ["#999900", "#CCCC00", "#FFFF00", "#FFFF33", "#FFFF66", "#FFFF99"],
  ["#4C9900", "#66CC00", "#80FF00", "#99FF33", "#B2FF66", "#CCFF99"],
  ["#009900", "#00CC00", "#00FF00", "#33FF33", "#66FF66", "#99FF99"],
  ["#00994C", "#00CC66", "#00FF80", "#33FF99", "#66FFB2", "#99FFCC"],
  ["#009999", "#00CCCC", "#00FFFF", "#33FFFF", "#66FFFF", "#99FFFF"],
  ["#004C99", "#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99CCFF"],
  ["#000099", "#0000CC", "#0000FF", "#3333FF", "#6666FF", "#9999FF"],
  ["#4C0099", "#6600CC", "#7F00FF", "#9933FF", "#B266FF", "#CC99FF"],
  ["#990099", "#CC00CC", "#FF00FF", "#FF33FF", "#FF66FF", "#FF99FF"],
  ["#99004C", "#CC0066", "#FF007F", "#FF3399", "#FF66B2", "#FF99CC"],
  ["#606060", "#808080", "#A0A0A0", "#C0C0C0", "#E0E0E0", "#FFFFFF"],
];

export const defaultCategoriesList = [
  {
    id: 0,
    name: "Starting Category",
    color: "#3399FF",
    list: [
      {
        id: 0,
        name: "Click on items to 'check' them",
        quantity:
          "You can remove all checked items using the button in the top right",
        isChecked: false,
      },
      {
        id: 1,
        name:
          "You can also remove whole categories using the trash can in the category card's top-right corner",
        quantity: "Feel free to delete this category and get started!",
        isChecked: false,
      },
    ],
  },
  {
    id: 1,
    name: "Bulk Foods",
    color: "#999900",
    list: [
      {
        id: 0,
        name: "Rice",
        quantity: "2lbs",
        isChecked: false,
      },
    ],
  },
];

export const defaultUser = {
  accessId: "a1exP@ssWord",
  admin: true,
  name: "Alex",
};
