const formFinanzas = {
  view: "form",
  id: "catalogoForm",
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
  ],
};
//hola
