const funSalir = () => {
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("idUsuario");

  location.reload();
};

const borrarUsuario = () => {
  const idUsuario = sessionStorage.getItem("idUsuario");
  webix
    .ajax()
    .del(`http://localhost:3000/usuarios/${idUsuario}`)
    .then(() => {
      window.sessionStorage.removeItem("usuario");
      window.sessionStorage.removeItem("idUsuario");

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
      id: "panelSalir",
      header: "Salir",
      body: salirView,
    },
  ],
  multiview: {
    animate: true,
  },
};
