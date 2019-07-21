import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";

import {
  GridComponent,
  GridDataResult,
  PageChangeEvent
} from "@progress/kendo-angular-grid";

import { debounceTime } from "rxjs/operators";
import { SortDescriptor, orderBy } from "@progress/kendo-data-query";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements AfterViewInit {
  public gridView: GridDataResult;
  public data: any[];
  public pageSize = 100;
  public skip = 0;

  @ViewChild("grid", { static: false }) private grid: GridComponent;

  constructor() {
    this.data = this.createRandomData(100000);
    this.loadProducts();
  }

  public ngAfterViewInit(): void {
    this.grid.pageChange
      .pipe(debounceTime(50))
      .subscribe(e => this.pageChange(e));
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.gridView = {
      data: orderBy(
        this.data.slice(this.skip, this.skip + this.pageSize),
        this.sort
      ),
      total: this.data.length
    };
  }
  public sort: SortDescriptor[] = [
    {
      field: "firstNames",
      dir: "asc"
    }
  ];
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadProducts();
  }

  public mySelection: number[] = [2, 4];

  /* Generating example data */
  private createRandomData(count: number): any[] {
    const firstNames = [
        "Nancy",
        "Andrew",
        "Janet",
        "Margaret",
        "Steven",
        "Michael",
        "Robert",
        "Laura",
        "Anne",
        "Nige"
      ],
      lastNames = [
        "Davolio",
        "Fuller",
        "Leverling",
        "Peacock",
        "Buchanan",
        "Suyama",
        "King",
        "Callahan",
        "Dodsworth",
        "White"
      ],
      cities = [
        "Seattle",
        "Tacoma",
        "Kirkland",
        "Redmond",
        "London",
        "Philadelphia",
        "New York",
        "Seattle",
        "London",
        "Boston"
      ],
      titles = [
        "Accountant",
        "Vice President, Sales",
        "Sales Representative",
        "Technical Support",
        "Sales Manager",
        "Web Designer",
        "Software Developer"
      ];

    return Array(count)
      .fill({})
      .map((_, idx) => ({
        id: idx + 1,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        title: titles[Math.floor(Math.random() * titles.length)]
      }));
  }
}
