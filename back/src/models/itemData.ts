// export const UserData = [
//     {username: "John", password: "123", isLogin: false},
//     {username: "test", password: "123", isLogin: false},
//     {username: "yay", password: "123", isLogin: false},
//     {username: "rabbit", password: "123", isLogin: false}];

// Added Zubayer's profile information to the UserData
export const UserData = [
  {
    id: 1,
    username: "John",
    password: "123",
    email: null,
    isLogin: false,
    profilePictureUrl: "1715522467043-profile1.jpg",
    createTime: "2024-05-11 18:34:13",
    name: "John Doe",
    location: "Florida",
    gender: "Male",
    age: 20,
    interests: "Hockey, Fishing, Yoyo",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    school: "Florida State University",
    coverPicture: "1715522467045-cover1.jpg",
    createdAt: "2024-05-11 18:34:13",
    updatedAt: "2024-05-12 13:58:32",
  },
  {
    id: 2,
    username: "test",
    password: "123",
    email: null,
    isLogin: false,
    profilePictureUrl: "1715522939224-profile2.jpg",
    createTime: "2024-05-11 18:34:13",
    name: "Lulu",
    location: "Ohio",
    gender: "Female",
    age: 24,
    interests: "Dancing",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    school: "Ohio State University",
    coverPicture: "1715522939225-cover2.png",
    createdAt: "2024-05-11 18:34:13",
    updatedAt: "2024-05-12 14:07:53",
  },
  {
    id: 3,
    username: "yay",
    password: "123",
    email: null,
    isLogin: false,
    profilePictureUrl: "1715523512056-profile4.jpg",
    createTime: "2024-05-11 18:34:13",
    name: "Lori Jacobs",
    location: "NYC",
    gender: "Female",
    age: 24,
    interests: "Mario Kart",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    school: "Hunter College",
    coverPicture: "1715523512058-cover.jpg",
    createdAt: "2024-05-11 18:34:13",
    updatedAt: "2024-05-11 20:05:45",
  },
  {
    id: 4,
    username: "rabbit",
    password: "123",
    email: null,
    isLogin: false,
    profilePictureUrl: "1715523115881-profile3.jpg",
    createTime: "2024-05-11 18:34:13",
    name: "Jimmy Smith",
    location: "California",
    gender: "Male",
    age: 19,
    interests: "Fishing, Chess",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    school: "Berkeley",
    coverPicture: "1715523115882-profile4.jpg",
    createdAt: "2024-05-11 18:34:13",
    updatedAt: "2024-05-12 14:10:48",
  },
];

export const PetTypeData = [
  {
    id: 1,
    name: "CHERRY",
    description: "../asset/petA.PNG",
    hunger: 50,
    status: 50,
  },
  {
    id: 2,
    name: "CHOCO",
    description: "../asset/petB.PNG",
    hunger: 60,
    status: 50,
  },
  {
    id: 3,
    name: "MOMO",
    description: "../asset/petC.PNG",
    hunger: 80,
    status: 50,
  },
  {
    id: 4,
    name: "LUCKY",
    description: "../asset/petA.PNG",
    hunger: 100,
    status: 100,
  },
];

export const ItemData = [
  {
    id: 1,
    name: "Apple",
    description: "Increase 3 hunger status",
    info: "Apple",
  },
  {
    id: 2,
    name: "Pineapple",
    description: "Increase 5 hunger status",
    info: "Pineapple",
  },
  {
    id: 3,
    name: "Cherry",
    description: "Increase 7 hunger status",
    info: "Cherry",
  },
  {
    id: 4,
    name: "Orange",
    description: "Increase 10 hunger status",
    info: "Orange",
  },
  {
    id: 5,
    name: "Mango",
    description: "Increase 10 hungerstatus",
    info: "Mango",
  },
  {
    id: 7,
    name: "Pear",
    description: "Increase 13 hunger status",
    info: "Pear",
  },
  {
    id: 8,
    name: "Drypack1",
    description: "Increase 15 hunger status",
    info: "Drypack1",
  },
  {
    id: 9,
    name: "Meat",
    description: "Increase 20 hunger status",
    info: "Meat",
  },
  {
    id: 10,
    name: "DryFoods",
    description: "Increase 30 hunger status",
    info: "DryFoods",
  },
];

export const StorageDB = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

export const levelData = [
  {
    id: 1,
    level: 1,
    needed_exp: 100,
  },
  {
    id: 2,
    level: 2,
    needed_exp: 200,
  },
  {
    id: 3,
    level: 3,
    needed_exp: 300,
  },
  {
    id: 4,
    level: 4,
    needed_exp: 400,
  },
  {
    id: 5,
    level: 5,
    needed_exp: 500,
  },
  {
    id: 6,
    level: 6,
    needed_exp: 600,
  },
  {
    id: 7,
    level: 7,
    needed_exp: 700,
  },
  {
    id: 8,
    level: 8,
    needed_exp: 800,
  },
  {
    id: 9,
    level: 9,
    needed_exp: 900,
  },
  {
    id: 10,
    level: 10,
    needed_exp: 1000,
  },
];
