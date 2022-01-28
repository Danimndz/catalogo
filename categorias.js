// const user = sessionStorage.getItem("usuario");
const limpiarCategorias = () => {
  $$("categoriaForm").clear();
  $$("modificarCategoria").hide();
  $$("saveBtnCategoria").show();
  $$("borrarCategoriaBtn").hide();
};

const borrarCategoria = () => {
  let productToDelete = $$("categoriaForm").getValues();
  webix
    .ajax()
    .headers({ Authorization: `Bearer ${sessionStorage.getItem("auth")}` })
    .del(
      `http://localhost:3000/productos/${productToDelete.id}`,
      productToDelete
    )
    //On api when DELETE method is called it should return an array of all elements
    .then((res) => {
      $$("tablaCategorias").clearAll();
      $$("tablaCategorias").parse(res.json());
      $$("saveBtnCategoria").show();
      $$("borrarCategoriaBtn").hide();
      $$("modificarCategoria").hide();
    });
};

const modificarCategoria = () => {
  /*
    TODO: when a new product is edited find the category by id
    and return the category value to be displayed
    */
  let productToEdit = $$("categoriaForm").getValues();
  webix
    .ajax()
    .headers({ Authorization: `Bearer ${sessionStorage.getItem("auth")}` })
    .put(`http://localhost:3000/productos/${productToEdit.id}`, productToEdit)
    //On api when PUT method is called it should return an array of all elements
    .then((res) => {
      $$("tablaCategorias").clearAll();
      $$("tablaCategorias").parse(res.json());
      $$("saveBtnCategoria").show();
      $$("borrarCategoriaBtn").hide();
      $$("modificarCategoria").hide();
    });
};

const onSubmitCategoria = () => {
  /*
    TODO: when a new product is inserted find the category by id
    and return the category value to be displayed
    */
  const newProduct = $$("categoriaForm").getValues();
  //product id added manually; to be removed
  newProduct.id = 10;

  webix
    .ajax()
    .headers({ Authorization: `Bearer ${sessionStorage.getItem("auth")}` })
    .post("http://localhost:3000/productos", newProduct)
    //On api when POST method is called it should return an array of all elements
    .then((content) => {
      $$("tablaCategorias").clearAll();
      $$("tablaCategorias").parse(content.json());
    });
};

const formCategoria = {
  view: "form",
  id: "categoriaForm",
  elements: [
    {
      rows: [
        {
          view: "text",
          label: "Categoria",
          name: "categoria",
          id: "categoria",
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
          id: "saveBtnCategoria",
          click: function () {
            if (this.getFormView().validate()) {
              onSubmitCategoria();
            }
          },
        },
        {
          view: "button",
          css: "webix_primary",
          label: "Edit",
          id: "modificarCategoria",
          click: modificarCategoria,
          hidden: true,
        },
        {
          view: "button",
          css: "webix_alert",
          label: "cancel",
          id: "cancelBtnPass",
          click: limpiarCategorias,
        },
      ],
    },
    {
      view: "datatable",
      id: "tablaCategorias",
      url: "http://localhost:3000/categorias",
      select: "row",
      columns: [
        {
          id: "categoria",
          header: "Categoria",
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
      id: "borrarCategoriaBtn",
      click: borrarCategoria,
      hidden: true,
    },
  ],
};
