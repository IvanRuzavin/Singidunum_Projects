/* 

Angular material module / Material components

Button
https://material.angular.dev/components/button/api

Icon
https://material.angular.dev/components/icon/api

FormField
https://material.angular.dev/components/form-field/api

Input
https://material.angular.dev/components/input/api

Datepicker + native date picker
https://material.angular.dev/components/datepicker/api
https://material.angular.dev/components/datepicker/overview#:~:text=provideNativeDateAdapter%20or-,MatNativeDateModule,-Date%20type

Checkbox:
https://material.angular.dev/components/checkbox/api

Sidenav
https://material.angular.dev/components/sidenav/api

Toolbar
https://material.angular.dev/components/toolbar/api

Router
https://angular.dev/guide/routing/define-routes#adding-the-router-to-your-application

Mat List
https://material.angular.dev/components/list/api

Mat Tabs
https://material.angular.dev/components/tabs/api

Mat Card
https://material.angular.dev/components/card/api

Select
https://material.angular.dev/components/select/api

Progress Spinner
https://material.angular.dev/components/progress-spinner/api

Table
https://material.angular.dev/components/table/api

Sort
https://material.angular.dev/components/sort/api

Paginator
https://material.angular.dev/components/paginator/api

Dialog
https://material.angular.dev/components/dialog/api

*/

import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule ({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule
    ]
})

export class MaterialModule {}