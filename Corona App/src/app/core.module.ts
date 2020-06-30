import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatisticsService } from './shared/services/statistics.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';


const materialDesignModules = [
    FlexLayoutModule
];

const angularLibraries = [
    HttpClientModule,
    FormsModule,
    RouterModule,
]

const externalLibraries = [
    NgxChartsModule
]


@NgModule({
    imports: [
        CommonModule,
        angularLibraries,
        materialDesignModules,
        externalLibraries
    ],
    providers: [
        StatisticsService
    ],
    exports: [
        CommonModule,
        angularLibraries,
        materialDesignModules,
        externalLibraries
    ]
})
export class CoreModule { }
