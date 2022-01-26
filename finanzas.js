const limpiarFinanzas = () => {
  $$("finanzasForm").clear();
  $$("editBtnF").hide();
  $$("saveBtnF").show();
  $$("deleteBtnF").hide();
};

const deleteF = () => {
  let values = $$("finanzasForm").getValues();
  webix
    .ajax()
    .del(`http://alumnos01.enlacenet.net:8005/DelFinanzas/${user}`, values)
    .then((res) => {
      $$("tablaFinanzas").clearAll();
      $$("tablaFinanzas").parse(res.json());
      $$("deleteBtnF").hide();
      $$("editBtnF").hide();
      $$("saveBtnF").show();
    });
};

const editF = () => {
  let values = $$("finanzasForm").getValues();
  webix
    .ajax()
    .put(`http://alumnos01.enlacenet.net:8005/UpdateFinanzas/${user}`, values)
    .then((res) => {
      $$("tablaFinanzas").clearAll();
      $$("tablaFinanzas").parse(res.json());
      $$("deleteBtnF").hide();
      $$("editBtnF").hide();
      $$("saveBtnF").show();
    });
};

const onsubmitFinanza = () => {
  const newFinanzas = $$("finanzasForm").getValues();
  webix
    .ajax()
    .post(
      `http://alumnos01.enlacenet.net:8005/postFinanzas/${user}`,
      newFinanzas
    )
    .then(function (content) {
      $$("tablaFinanzas").clearAll();
      $$("tablaFinanzas").parse(content.json());
    });
};

const formFinanzas = {
  view: "form",
  id: "finanzasForm",
  elements: [
    {
      columns: [
        {
          id: "producto",
          header: "Producto",
          fillspace: true,
          sort: "string",
          select: "row",
        },
        {
          id: "categoria",
          header: "Categoria",
          fillspace: true,
          sort: "string",
          select: "row",
        },
        {
          id: "precio",
          header: "Precio",
          fillspace: true,
          sort: "string",
          select: "row",
        },
      ],
      view: "datatable",
      select: "row",
      id: "tablaFinanzas",
      url: "http://localhost:3000/productos",
    },
    {
      view: "button",
      css: "webix_danger",
      label: "Delete",
      id: "deleteBtnF",
      click: deleteF,
      hidden: true,
    },
  ],
};
