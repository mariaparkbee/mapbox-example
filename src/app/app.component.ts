import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SearchBoxCore, SearchSession } from '@mapbox/search-js-core';

const MAPBOX__ACCESS_TOKEN =
  'pk.eyJ1IjoiZHBpZXRyb2NhcmxvIiwiYSI6ImNram9tOGFuMTBvb3oyeXFsdW5uYmJjNGQifQ._zE6Mub0-Vpl7ggMj8xSUQ';
const MAPBOX_SEARCH_API_LIMIT = 5;
const MAPBOX_SEARCH_API_POIS =
  'food,outlet_store,tourist_attraction,airport,park,parking_lot,church,cinema,theatre,football_stadium,aquarium,art_gallery,arts_center,department_store,shopping_mall,hotel,zoo,hospital,museum,concert_hall,entertainment,historic_site,stadium,railway_station,school,university,nightclub';
const MAPBOX_SEARCH_API_ENABLED_TYPES =
  'locality,place,neighborhood,address,poi,street';
const MAPBOX_SEARCH_API_ENABLED_COUNTRIES = 'nl,gb,be,de';
const CURRENT_LANGUAGE = 'en';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  mapboxSession: any;
  suggestions$!: Promise<any>;
  searchQuery = 'Oude Haven';

  ngOnInit() {
    const searchBoxCore = new SearchBoxCore({
      accessToken: MAPBOX__ACCESS_TOKEN,
    });
    this.mapboxSession = new SearchSession(searchBoxCore, 200);
    this.suggestions$ = this.getSuggestions(this.searchQuery);
  }

  private getSuggestions(searchQuery: string) {
    const mapboxSession = this.mapboxSession;

    try {
      const suggestions = mapboxSession.suggest(searchQuery, {
        limit: MAPBOX_SEARCH_API_LIMIT,
        country: MAPBOX_SEARCH_API_ENABLED_COUNTRIES,
        language: CURRENT_LANGUAGE,
        poi_category: MAPBOX_SEARCH_API_POIS,
        types: MAPBOX_SEARCH_API_ENABLED_TYPES,
      });
      return suggestions;
    } catch (error) {
      console.warn(error);
      throw new Error('MapboxSearchboxService @Suggestion request failure');
    }
  }
}
