const funSalir = () => {
  sessionStorage.removeItem("auth");

  location.reload();
};

const borrarUsuario = () => {
  webix
    .ajax()
    .headers({ Authorization: `Bearer ${sessionStorage.getItem("auth")}` })
    .del(`http://localhost:3000/usuarios`)
    .then(() => {
      window.sessionStorage.removeItem("auth");

      window.location.reload();
    });
};

const salirView = {
  rows: [
    { view: "label", label: "Desea salir?" },
    { view: "button", id: "ButtonSalir", value: "salir", click: funSalir },
    {
      view: "button",
      id: "ButtonBorrar",
      css: "webix_danger",
      value: "Borrar Usuario",
      click: borrarUsuario,
    },
  ],
};

const panelPrincipal = {
  view: "tabview",
  id: "panelPrincipal",
  cells: [
    {
      header: "Catalogo",
      id: "panelCategoria",
      body: { rows: [formCatalogo] },
    },
    {
      header: "Usuarios",
      id: "panelCuentas",
      body: { rows: [formCuentas] },
    },
    {
      header: "Categorias",
      id: "panelCategorias",
      body: { rows: [formCategoria] },
    },
    {
      id: "panelSalir",
      header: "Salir",
      body: salirView,
    },
  ],
  multiview: {
    animate: true,
  },
};
