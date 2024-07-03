export interface NavBarItem {
    _id: number;
    title: string;
    link: string;
  }
  
  export const navBarList: NavBarItem[] = [
    {
      _id: 1001,
      title: "Home",
      link: "/",
    },
    {
      _id: 1002,
      title: "Shop",
      link: "/collections",
    },
    {
      _id: 1003,
      title: "About",
      link: "/about",
    },
    {
      _id: 1004,
      title: "Contact",
      link: "contact",
    },
];