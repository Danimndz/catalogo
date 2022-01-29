// const user = sessionStorage.getItem("usuario");
const limpiarCatalogo = () => {
  $$("catalogoAdminForm").clear();
  $$("modificarProducto").hide();
  $$("saveBtn").show();
  $$("borrarProductoBtn").hide();
};

const borrarProducto = () => {
  let productToDelete = $$("catalogoAdminForm").getValues();
  webix
    .ajax()
    .headers({ Authorization: `Bearer ${sessionStorage.getItem("auth")}` })
    .del(`http://localhost:3000/productos/${productToDelete.id}`)
    //On api when DELETE method is called it should return an array of all elements
    .then((res) => {
      $$("tablaCatalogoAdmin").clearAll();
      $$("tablaCatalogoAdmin").parse(res.json());
      $$("saveBtn").show();
      $$("borrarProductoBtn").hide();
      $$("modificarProducto").hide();
    });
};

const modificarProducto = () => {
  /*
  TODO: when a new product is edited find the category by id
  and return the category value to be displayed
  */
  let productToEdit = $$("catalogoAdminForm").getValues();
  productToEdit.id_categoria = productToEdit.categoria;
  webix
    .ajax()
    .headers({ Authorization: `Bearer ${sessionStorage.getItem("auth")}` })
    .put(`http://localhost:3000/productos/${productToEdit.id}`, productToEdit)
    //On api when PUT method is called it should return an array of all elements
    .then((res) => {
      $$("tablaCatalogoAdmin").clearAll();
      $$("tablaCatalogoAdmin").parse(res.json());
      $$("saveBtn").show();
      $$("borrarProductoBtn").hide();
      $$("modificarProducto").hide();
    });
};

const onSubmitProducto = () => {
  /*
  TODO: when a new product is inserted find the category by id
  and return the category value to be displayed
  */
  let newProduct = $$("catalogoAdminForm").getValues();
  newProduct.id_categoria = newProduct.categoria;
  webix
    .ajax()
    .headers({ Authorization: `Bearer ${sessionStorage.getItem("auth")}` })
    .post("http://localhost:3000/productos", newProduct)
    //On api when POST method is called it should return an array of all elements
    .then((content) => {
      $$("tablaCatalogoAdmin").clearAll();
      $$("tablaCatalogoAdmin").parse(content.json());
    });
};

const formCatalogo = {
  view: "form",
  id: "catalogoAdminForm",
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
          name: "id",
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
              onSubmitProducto();
            }
          },
        },
        {
          view: "button",
          css: "webix_primary",
          label: "Edit",
          id: "modificarProducto",
          click: modificarProducto,
          hidden: true,
        },
        {
          view: "button",
          css: "webix_alert",
          label: "cancel",
          id: "cancelBtnPass",
          click: limpiarCatalogo,
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
      id: "borrarProductoBtn",
      click: borrarProducto,
      hidden: true,
    },
  ],
};
