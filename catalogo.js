const user = sessionStorage.getItem("usuario");
const limpiarPsw = () => {
  $$("catalogoForm").clear();
  $$("modificarBtnPass").hide();
  $$("saveBtn").show();
  $$("borrarPassBtn").hide();
};

const BorrarPass = () => {
  let values = $$("catalogoForm").getValues();
  webix
    .ajax()
    .del(`http://alumnos01.enlacenet.net:8005/DelPass/${user}`, values)
    .then((res) => {
      $$("tablaCatalogoAdmin").clearAll();
      $$("tablaCatalogoAdmin").parse(res.json());
      $$("saveBtn").show();
      $$("borrarPassBtn").hide();
      $$("modificarBtnPass").hide();
    });
};

const modificarPass = () => {
  let values = $$("catalogoForm").getValues();
  webix
    .ajax()
    .put(`http://alumnos01.enlacenet.net:8005/UpdatePass/${user}`, values)
    .then((res) => {
      $$("tablaCatalogoAdmin").clearAll();
      $$("tablaCatalogoAdmin").parse(res.json());
      $$("saveBtn").show();
      $$("borrarPassBtn").hide();
      $$("modificarBtnPass").hide();
    });
};

const onsubmitPass = () => {
  const newPass = $$("catalogoForm").getValues();
  webix
    .ajax()
    .post(`http://alumnos01.enlacenet.net:8005/postPass/${user}`, newPass)
    .then((content) => {
      $$("tablaCatalogoAdmin").clearAll();
      $$("tablaCatalogoAdmin").parse(content.json());
    });
};

const formCatalogo = {
  view: "form",
  id: "catalogoForm",
  elements: [
    {
      rows: [
        {
          view: "text",
          label: "Producto",
          name: "producto",
          id: "producto",
          required: true,
        },
        {
          label: "Categoria",
          name: "categoria",
          value: "0",
          options: "http://localhost:3000/categorias",
          view: "combo",
          required: true,
        },
        {
          view: "text",
          type: "number",
          label: "Precio",
          name: "precio",
          id: "precio",
          required: true,
        },
        {
          view: "text",
          name: "_id",
          id: "idP",
          hidden: true,
        },

        {
          view: "button",
          css: "webix_primary",
          label: "Save",
          id: "saveBtn",
          click: function () {
            if (this.getFormView().validate()) {
              onsubmitPass();
            }
          },
        },
        {
          view: "button",
          css: "webix_primary",
          label: "Edit",
          id: "modificarBtnPass",
          click: modificarPass,
          hidden: true,
        },
        {
          view: "button",
          css: "webix_alert",
          label: "cancel",
          id: "cancelBtnPass",
          click: limpiarPsw,
        },
      ],
    },
    {
      view: "datatable",
      id: "tablaCatalogoAdmin",
      url: "http://localhost:3000/productos",
      select: "row",
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
    },
    {
      view: "button",
      css: "webix_danger",
      label: "Delete",
      id: "borrarPassBtn",
      click: BorrarPass,
      hidden: true,
    },
  ],
};
