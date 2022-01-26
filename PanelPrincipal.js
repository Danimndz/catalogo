const funSalir = () => {
  sessionStorage.removeItem("usuario");
  location.reload();
};

const borrarUsuario = () => {
  webix
    .ajax()
    .del(`http://alumnos01.enlacenet.net:8005/borrarUsuario/${user}`)
    .then(() => {
      window.sessionStorage.removeItem("usuario");
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
