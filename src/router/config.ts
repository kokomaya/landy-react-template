const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/document", "/document/:id"],
    exact: true,
    component: "DocumentPage",
  },
];

export default routes;
