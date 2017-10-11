import {
  Version,
  Environment,
  EnvironmentType
} from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";
import { escape } from "@microsoft/sp-lodash-subset";

import {
  ModuleWithProviders
} from "@angular/core";
import pnp from "sp-pnp-js";

import * as strings from "HelloWorldWebPartStrings";
import { IHelloWorldWebPartProps } from "./IHelloWorldWebPartProps";
import { BaseAngularWebPart } from "../../core/webparts/base-angular.webpart";

import { ItemsService, MockItemsService } from "./app/shared/services";
import { AppRoutes } from "./app";
import { HomeComponent } from "./app/home";

export default class HelloWorldWebPartWebPart extends BaseAngularWebPart<IHelloWorldWebPartProps> {

  protected importDeclarationTypes: any = [];

  protected get appDeclarationTypes(): any[] {
    return [
      HomeComponent
    ];
  }

  protected get routes(): ModuleWithProviders {
    return AppRoutes;
  }

  protected get providers(): any[] {

    if (Environment.type === EnvironmentType.Local) {
      return [

        { provide: ItemsService, useClass: MockItemsService },

      ];
    } else if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
      return [

        { provide: ItemsService, useClass: ItemsService },

      ];
    }

  }

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
