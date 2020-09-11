import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import DEP from "../../assets/departamentos.json";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit {
  mapboxAccessToken =
    "pk.eyJ1Ijoia2lrZXNhbiIsImEiOiJjazNpdzl0dGwwY3J2M29sZHdtMXp5YWZlIn0.8jb2XhxZeOpl1yTSSqfwbQ";
  private map;
  cities;
  ventas;
  mthStores;
  overlayMaps = {};

  /**
   * Array de capas con markers
   */
  layersTiendas = [];

  MthIcon = L.Icon.extend({
    options: {
      //shadowUrl: "leaf-shadow.png",
      iconSize: [33, 29], //[22, 19], //[44, 38],
      //shadowSize: [50, 64],
      iconAnchor: [12, 28], //[9, 18], //[15, 36],
      //shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    },
  });
  mthIconStore = new this.MthIcon({
    iconUrl: "../../../../assets/images/marker.png",
  });
  nikeIconStore = new this.MthIcon({
    iconUrl: "../../../../assets/images/markerNike.png",
  });
  uaIconStore = new this.MthIcon({
    iconUrl: "../../../../assets/images/markerUA.png",
  });
  tiendasMTH = [
    {
      nombre: "Marathon Plaza Norte",
      latlng: [-12.006123, -77.058525],
    },
    {
      nombre: "Marathon Open Plaza",
      latlng: [-13.5240301, -71.9504818],
    },
    {
      nombre: "Marathon Real Plaza Cuzco",
      latlng: [-9.9196522, -76.2412782],
    },
    {
      nombre: "Marathon Plaza Huánuco",
      latlng: [-14.0748697, -75.7398128],
    },
  ];
  tiendasNike = [
    {
      nombre: "Capa2 - 1",
      latlng: [-5.446237, -76.742347],
    },
    {
      nombre: "Capa2 - 2",
      latlng: [-5.886237, -76.242347],
    },
    {
      nombre: "Capa2 - 3",
      latlng: [-5.286237, -76.102347],
    },
    {
      nombre: "Capa2 - 4",
      latlng: [-6.206237, -76.442347],
    },
  ];
  tiendasUA = [
    {
      nombre: "Under Armour - 1",
      latlng: [-12.206237, -75.442347],
    },
    {
      nombre: "Under Armour - 2",
      latlng: [-12.506237, -75.402347],
    },
    {
      nombre: "Under Armour - 3",
      latlng: [-12.316237, -75.042347],
    },
    {
      nombre: "Under Armour - 4",
      latlng: [-11.826237, -74.992347],
    },
  ];

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
    this.groups();

    /* let mthIconStore = new this.MthIcon({
      iconUrl: "../../../../assets/images/marker.png",
    }); */

    L.icon = (options) => new L.Icon(options);

    /* let plazaNorte = L.marker([-12.006123, -77.058525], {
        icon: mthIconStore,
      })
        .addTo(this.map)
        .bindPopup("Marathon Plaza Norte"),
      openPlaza = L.marker([-12.1123, -77.011866], {
        icon: mthIconStore,
      })
        .addTo(this.map)
        .bindPopup("Marathon Open Plaza"),
      cuzco = L.marker([-13.5240301, -71.9504818], {
        icon: mthIconStore,
      })
        .addTo(this.map)
        .bindPopup("Marathon Real Plaza Cuzco"),
      huanuco = L.marker([-9.9196522, -76.2412782], {
        icon: mthIconStore,
      })
        .addTo(this.map)
        .bindPopup("Marathon Real Plaza Huánuco"),
      ica = L.marker([-14.0748697, -75.7398128], {
        icon: mthIconStore,
      })
        .addTo(this.map)
        .bindPopup("Marathon Sports Ica"),
      piura = L.marker([-5.186237, -80.642347], {
        icon: mthIconStore,
      })
        .addTo(this.map)
        .bindPopup("Marathon Real Plaza Piura"),
      chiclayo = L.marker([-6.778695, -79.832899], {
        icon: mthIconStore,
      })
        .addTo(this.map)
        .bindPopup("Marathon Real Plaza Chiclayo"),
      trujillo = L.marker([-8.103011, -79.047368], {
        icon: mthIconStore,
      })
        .addTo(this.map)
				.bindPopup("Marathon Mall Plaza Trujillo"); */

    /* let tiendas = L.layerGroup([
      plazaNorte,
      openPlaza,
      cuzco,
      huanuco,
      ica,
      piura,
      chiclayo,
      trujillo,
		]); */

    /* let tds = this.tiendasMTH.map((tienda) => {
      return L.marker(tienda.latlng, { icon: this.mthIconStore })
        .addTo(this.map)
        .bindPopup(tienda.nombre);
    });

    
    let tiendas = L.layerGroup(tds); */

    //this.layersTiendas.push(tiendas);

    //this.dibujaMakers(tiendas);
  }

  private initMap(): void {
    this.map = L.map("map", {
      center: [-9.1085055, -74.5327157],
      zoom: 5.5,
      layers: this.layersTiendas,
    });

    const tiles = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
        this.mapboxAccessToken,
      {
        //maxZoom: 19,
        id: "kikesan/ckc5brrj805sh1inrasl5g29o",
        //attribution: "TI",
        tileSize: 512,
        zoomOffset: -1,
        /* attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', */
      }
    );

    tiles.addTo(this.map);

    //L.control.layers(null, this.overlayMaps).addTo(this.map);
  }

  dibujaMakers(makers) {
    L.control.layers(null, { "Tiendas Marathon": makers }).addTo(this.map);
  }

  groups() {
    let tds = this.tiendasMTH.map((tienda) => {
      return L.marker(tienda.latlng, { icon: this.mthIconStore })
        .addTo(this.map)
        .bindPopup(tienda.nombre);
    });

    const marathon = L.layerGroup(tds);

    let tdsNike = this.tiendasNike.map((tienda) => {
      return L.marker(tienda.latlng, { icon: this.nikeIconStore })
        .addTo(this.map)
        .bindPopup(tienda.nombre);
    });

    const nike = L.layerGroup(tdsNike);
    //this.layersTiendas.push(this.cities);

    let tdsUA = this.tiendasUA.map((tienda) => {
      return L.marker(tienda.latlng, { icon: this.uaIconStore })
        .addTo(this.map)
        .bindPopup(tienda.nombre);
    });

    const under = L.layerGroup(tdsUA);
    //this.layersTiendas.push(this.ventas);

    this.overlayMaps = {
      Nike: nike,
      "Under Armour": under,
      "<span style='color: red'>Marathon</span>": marathon,
    };

    L.control
      .layers(null, this.overlayMaps, { collapsed: true })
      .addTo(this.map);
  }
}
