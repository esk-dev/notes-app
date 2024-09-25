import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { distinctUntilChanged, filter, map, Observable } from 'rxjs';

export enum Devices {
  'Mobile' = 'Mobile',
  'Tablet' = 'Tablet',
  'Web' = 'Web',
}

export type ObservedDevicesType = keyof typeof Devices;

export const LAYOUT_SHORT_TYPES_MAP = new Map([
  [Breakpoints.Handset, Breakpoints.Handset],
  [Breakpoints.HandsetPortrait, Breakpoints.Handset],
  [Breakpoints.HandsetLandscape, Breakpoints.Handset],
  [Breakpoints.Tablet, Breakpoints.Tablet],
  [Breakpoints.TabletPortrait, Breakpoints.Tablet],
  [Breakpoints.TabletLandscape, Breakpoints.Web],
  [Breakpoints.Web, Breakpoints.Web],
  [Breakpoints.WebPortrait, Breakpoints.Web],
  [Breakpoints.WebLandscape, Breakpoints.Web],
]);

export const ObservedLayouts: Map<string, ObservedDevicesType> = new Map([
  [Breakpoints.Handset, Devices.Mobile],
  [Breakpoints.Tablet, Devices.Tablet],
  [Breakpoints.Web, Devices.Web],
]);

@Injectable({
  providedIn: 'root',
})
export class DeviceObserverService {
  public readonly device$: Observable<ObservedDevicesType> = inject(BreakpointObserver)
    .observe([...ObservedLayouts.keys()])
    .pipe(
      map((result: BreakpointState) => {
        let type: ObservedDevicesType;
        for (const state of Object.keys(result.breakpoints)) {
          if (result.breakpoints[state]) {
            const tempKey: string = LAYOUT_SHORT_TYPES_MAP.get(state) ?? Breakpoints.Handset;
            type = ObservedLayouts.get(tempKey) ?? ObservedLayouts.get(Breakpoints.Handset)!;
            break;
          }
        }
        return type!;
      }),
      distinctUntilChanged(),
      filter(Boolean),
    );
}
