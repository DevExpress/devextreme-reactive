# [2.1.2](https://github.com/DevExpress/devextreme-reactive/compare/v2.1.1...v2.1.2) (2019-10-11)


### Bug Fixes

* **react-grid:** add width convert for TableEditColumn ([#2408](https://github.com/DevExpress/devextreme-reactive/issues/2408)) ([6f7592f](https://github.com/DevExpress/devextreme-reactive/commit/6f7592ffaac26875b72554465e012cd83010b495))
* **react-grid:** allow inline cell editing only for table data type rows ([#2390](https://github.com/DevExpress/devextreme-reactive/issues/2390)) ([ac1b279](https://github.com/DevExpress/devextreme-reactive/commit/ac1b279e64960bd32e4f0276f8514276c607b97b))
* **react-grid:** check next column name by column.name instead type ([#2399](https://github.com/DevExpress/devextreme-reactive/issues/2399)) ([7acfcbb](https://github.com/DevExpress/devextreme-reactive/commit/7acfcbb970dbc6ea599d1ec8126285050bd54a20))
* **react-grid-demos:** correct displaying custom selector in Edge ([#2422](https://github.com/DevExpress/devextreme-reactive/issues/2422)) ([832586f](https://github.com/DevExpress/devextreme-reactive/commit/832586f10788b6d8154414d00256aee420a1bc47))
* **react-grid-material-ui:** add padding for first edit cell in in-line cell editing mode ([#2392](https://github.com/DevExpress/devextreme-reactive/issues/2392)) ([f011a55](https://github.com/DevExpress/devextreme-reactive/commit/f011a559d1e46e99bc77ed5ce245fa55a2ee0d2e))
* **scheduler-core:** calculate the last TimeScale EndDate correctly ([#2404](https://github.com/DevExpress/devextreme-reactive/issues/2404)) ([0411235](https://github.com/DevExpress/devextreme-reactive/commit/04112353d007442c2b5e4b2b2cf21b8298241f9a))


### Features

* **scheduler-core:** time scale should take fractional startDayHour/endDayHour values ([#2396](https://github.com/DevExpress/devextreme-reactive/issues/2396)) ([272b351](https://github.com/DevExpress/devextreme-reactive/commit/272b3511fadf713d1e65e88a52e7693621ee06a9))
* **scheduler-core:** use different default counts for different recurrence types ([#2372](https://github.com/DevExpress/devextreme-reactive/issues/2372)) ([6eb2dc3](https://github.com/DevExpress/devextreme-reactive/commit/6eb2dc3baeb7b8e0cd0088ae0134f207beed12f1))



# [2.1.1](https://github.com/DevExpress/devextreme-reactive/compare/v2.1.0...v2.1.1) (2019-10-01)


### Bug Fixes

* **react-grid:** correctly import interface from grid-core package ([#2375](https://github.com/DevExpress/devextreme-reactive/issues/2375)) ([906b5b2](https://github.com/DevExpress/devextreme-reactive/commit/906b5b2))
* **react-scheduler-material-ui:** correct AppointmentTooltip OpenButton position ([#2367](https://github.com/DevExpress/devextreme-reactive/issues/2367)) ([3fbcf4a](https://github.com/DevExpress/devextreme-reactive/commit/3fbcf4a))



# [2.1.0](https://github.com/DevExpress/devextreme-reactive/compare/v2.0.5...v2.1.0) (2019-09-30)


### Bug Fixes

* **react-grid:** add type checking for next column in getNextColumnName ([#2354](https://github.com/DevExpress/devextreme-reactive/issues/2354)) ([03e261c](https://github.com/DevExpress/devextreme-reactive/commit/03e261c))
* **react-grid:** allow columns bands to work in virtual table ([#2291](https://github.com/DevExpress/devextreme-reactive/issues/2291)) ([582eb94](https://github.com/DevExpress/devextreme-reactive/commit/582eb94))
* **react-grid:** correct displaying "No data" message in Edge ([#2332](https://github.com/DevExpress/devextreme-reactive/issues/2332)) ([e16be01](https://github.com/DevExpress/devextreme-reactive/commit/e16be01)), closes [#2330](https://github.com/DevExpress/devextreme-reactive/issues/2330)
* **react-grid:** correct getCellWidth property's default value ([#2353](https://github.com/DevExpress/devextreme-reactive/issues/2353)) ([9fde9b0](https://github.com/DevExpress/devextreme-reactive/commit/9fde9b0))
* **react-grid-bootstrap4:** correct position when horizontal scrolling ([#2364](https://github.com/DevExpress/devextreme-reactive/issues/2364)) ([908bcbe](https://github.com/DevExpress/devextreme-reactive/commit/908bcbe))
* **react-scheduler:** move firstDayOfWeek prop from views to Scheduler ([#2360](https://github.com/DevExpress/devextreme-reactive/issues/2360)) ([dd5753b](https://github.com/DevExpress/devextreme-reactive/commit/dd5753b))
* **react-scheduler-demos:** add capability to delete zero index appointment ([#2341](https://github.com/DevExpress/devextreme-reactive/issues/2341)) ([1e837eb](https://github.com/DevExpress/devextreme-reactive/commit/1e837eb)), closes [#2338](https://github.com/DevExpress/devextreme-reactive/issues/2338)
* **scheduler-core:** correct date formatting string for Safari ([#2365](https://github.com/DevExpress/devextreme-reactive/issues/2365)) ([04989e8](https://github.com/DevExpress/devextreme-reactive/commit/04989e8))
* **scheduler-core:** get rid of different `new Date` behavior in Safari ([#2370](https://github.com/DevExpress/devextreme-reactive/issues/2370)) ([061fd31](https://github.com/DevExpress/devextreme-reactive/commit/061fd31)), closes [#2369](https://github.com/DevExpress/devextreme-reactive/issues/2369)


### Features

* **react-grid:** implement Inline Cell Editing ([#2302](https://github.com/DevExpress/devextreme-reactive/issues/2302)) ([27be87f](https://github.com/DevExpress/devextreme-reactive/commit/27be87f))
* **react-scheduler:** add capability to edit recurrent appointments to appointment form ([#2205](https://github.com/DevExpress/devextreme-reactive/issues/2205)) ([da2c36a](https://github.com/DevExpress/devextreme-reactive/commit/da2c36a)), closes [#2203](https://github.com/DevExpress/devextreme-reactive/issues/2203)


### BREAKING CHANGES

* **react-scheduler:** The `AppointmentForm` plugin now doesn't have the `popupComponent`, `containerComponent`, `scrollableAreaComponent` and `staticAreaComponent` properties. We have made many changes to the form. You can find all the new properties in the [AppointmentForm Plugin Reference](https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/reference/appointment-form/).

```diff
...
<AppointmentForm
-  popupComponent
-  containerComponent
-  scrollableAreaComponent
-  staticAreaComponent
/>
...
```

* **react-scheduler:** The `MonthView` and `WeekView` plugins now do not have firstDayOfWeek property. It was moved to the `Scheduler` plugin.

```diff
<Scheduler
+  firstDayOfWeek={firstDayOfWeek}
>
  <MonthView
-    firstDayOfWeek={firstDayOfWeek}
  >
  <WeekView
-    firstDayOfWeek={firstDayOfWeek}
  >
   ...
</Scheduler>
```

# [2.0.5](https://github.com/DevExpress/devextreme-reactive/compare/v2.0.4...v2.0.5) (2019-09-16)


### Bug Fixes

* **react-chart:** fix typescript in scales ([#2314](https://github.com/DevExpress/devextreme-reactive/issues/2314)) ([15ecec0](https://github.com/DevExpress/devextreme-reactive/commit/15ecec0))
* **react-grid:** add summary rows only if summary items are specified ([#2298](https://github.com/DevExpress/devextreme-reactive/issues/2298)) ([5ee7d97](https://github.com/DevExpress/devextreme-reactive/commit/5ee7d97))
* **react-grid:** correct displaying Filter Selector in Edge ([#2318](https://github.com/DevExpress/devextreme-reactive/issues/2318)) ([903f3c5](https://github.com/DevExpress/devextreme-reactive/commit/903f3c5))
* **react-scheduler:** make it possible to create an appointment after cancelled drag-drop ([#2307](https://github.com/DevExpress/devextreme-reactive/issues/2307)) ([b666250](https://github.com/DevExpress/devextreme-reactive/commit/b666250))
* **react-scheduler-material-ui:** remove lastChild's paddingRight from all cells ([#2323](https://github.com/DevExpress/devextreme-reactive/issues/2323)) ([27121c2](https://github.com/DevExpress/devextreme-reactive/commit/27121c2))
* **scheduler-core:** delete recurrent appointments correctly with 'delete current and following' option ([#2313](https://github.com/DevExpress/devextreme-reactive/issues/2313)) ([d3d1df7](https://github.com/DevExpress/devextreme-reactive/commit/d3d1df7))
* **scheduler-core:** fix Drag-and-Drop of recurrent appointments with UNTIL ([#2321](https://github.com/DevExpress/devextreme-reactive/issues/2321)) ([ba6cf21](https://github.com/DevExpress/devextreme-reactive/commit/ba6cf21))


### Features

* **react-grid:** improve column resizing ([#2218](https://github.com/DevExpress/devextreme-reactive/issues/2218)) ([cd73218](https://github.com/DevExpress/devextreme-reactive/commit/cd73218))
* **react-scheduler:** display month's name in the first day cell of the month in MonthView ([#2316](https://github.com/DevExpress/devextreme-reactive/issues/2316)) ([28cd3d2](https://github.com/DevExpress/devextreme-reactive/commit/28cd3d2))



# [2.0.4](https://github.com/DevExpress/devextreme-reactive/compare/v2.0.3...v2.0.4) (2019-09-02)


### Bug Fixes

* **react-chart:** fix arrow displaying on corner point ([#2232](https://github.com/DevExpress/devextreme-reactive/issues/2232)) ([5c49aca](https://github.com/DevExpress/devextreme-reactive/commit/5c49aca))
* **react-grid:** allow DataTypeProvider editor to know if editing is enabled ([#2265](https://github.com/DevExpress/devextreme-reactive/issues/2265)) ([b3cdd95](https://github.com/DevExpress/devextreme-reactive/commit/b3cdd95))
* **react-grid:** correct calculating start index of loading row for Infinite Scrolling ([#2256](https://github.com/DevExpress/devextreme-reactive/issues/2256)) ([1741f9c](https://github.com/DevExpress/devextreme-reactive/commit/1741f9c))
* **react-grid:** correct displaying Page Size Selector in Edge ([#2246](https://github.com/DevExpress/devextreme-reactive/issues/2246)) ([f67e419](https://github.com/DevExpress/devextreme-reactive/commit/f67e419))
* **react-grid:** correct offset calculation in virtual table ([#2245](https://github.com/DevExpress/devextreme-reactive/issues/2245)) ([4d3fba9](https://github.com/DevExpress/devextreme-reactive/commit/4d3fba9))
* **react-grid:** correctly handle column count changes in virtual table ([#2257](https://github.com/DevExpress/devextreme-reactive/issues/2257)) ([451c56c](https://github.com/DevExpress/devextreme-reactive/commit/451c56c))
* **react-scheduler:** correct render horizontal draft appointments by DnD ([#2258](https://github.com/DevExpress/devextreme-reactive/issues/2258)) ([d919d19](https://github.com/DevExpress/devextreme-reactive/commit/d919d19))
* **react-scheduler:** fix create an appointment on the first call of AppointmentForm ([#2272](https://github.com/DevExpress/devextreme-reactive/issues/2272)) ([8ab05ef](https://github.com/DevExpress/devextreme-reactive/commit/8ab05ef))
* **react-scheduler:** fix incorrect render of recurrent appointments in the first cell of AllDayPanel ([#2264](https://github.com/DevExpress/devextreme-reactive/issues/2264)) ([fe33ea2](https://github.com/DevExpress/devextreme-reactive/commit/fe33ea2))
* **react-scheduler:** make it possible to drag-drop appointments in MonthView with AllDayPanel plugin ([#2275](https://github.com/DevExpress/devextreme-reactive/issues/2275)) ([456a423](https://github.com/DevExpress/devextreme-reactive/commit/456a423))
* **react-scheduler:** prevent double render of all-day recurrence appointments ([#2253](https://github.com/DevExpress/devextreme-reactive/issues/2253)) ([e92bdeb](https://github.com/DevExpress/devextreme-reactive/commit/e92bdeb))
* **scheduler-core:** display recurrent appointments in the lower right corner of WeekView correctly ([#2290](https://github.com/DevExpress/devextreme-reactive/issues/2290)) ([bc8ae2d](https://github.com/DevExpress/devextreme-reactive/commit/bc8ae2d))
* **scheduler-core:** fix recurrent appointment disappearing after dragdrop ([#2288](https://github.com/DevExpress/devextreme-reactive/issues/2288)) ([5cc0aaf](https://github.com/DevExpress/devextreme-reactive/commit/5cc0aaf))


### Features

* **react-scheduler:** add capability to edit recurring appointments ([#2168](https://github.com/DevExpress/devextreme-reactive/issues/2168)) ([c726b6a](https://github.com/DevExpress/devextreme-reactive/commit/c726b6a)), closes [#2202](https://github.com/DevExpress/devextreme-reactive/issues/2202)


BREAKING CHANGES:

* **react-scheduler:** Editing logic for recurrent appointments was removed from the `EditingState` plugin. Now, editing requires the `EditingState`, and either the `IntegratedEditing` or the `EditRecurrenceMenu` plugin. In addition, you can add the [EditRecurrenceMenu](https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/reference/edit-recurrence-menu/) plugin to allow users to select how recurrent appointments are edited.

```diff
<Scheduler>
   <EditingState />
+  <EditRecurrenceMenu />
+  {/* or <IntegratedEditing />*/}
   ...
</Scheduler>
```

The following `EditingState` properties were replaced:

- `editingAppointmentId` -> `editingAppointment`
- `defaultEditingAppointmentId` -> `defaultEditingAppointment`
- `onEditingAppointmentIdChange` -> `onEditingAppointmentChange`

The new properties contain an [AppointmentModel](https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/reference/scheduler/#appointmentmodel) of the appointment being edited.

```diff
<Scheduler>
   <EditingState
-    editingAppointmentId
-    defaultEditingAppointmentId
-    onEditingAppointmentIdChange
+    editingAppointment
+    defaultEditingAppointment
+    onEditingAppointmentChange
   />
   ...
</Scheduler>
```


# [2.0.3](https://github.com/DevExpress/devextreme-reactive/compare/v2.0.2...v2.0.3) (2019-08-16)


### Bug Fixes

* **react-chart:** fix axis layout after update data ([#2199](https://github.com/DevExpress/devextreme-reactive/issues/2199)) ([2b84bd8](https://github.com/DevExpress/devextreme-reactive/commit/2b84bd8))
* **react-grid:** correctly calculate force reload interval when total count is 0 ([#2238](https://github.com/DevExpress/devextreme-reactive/issues/2238)) ([e9daa64](https://github.com/DevExpress/devextreme-reactive/commit/e9daa64))
* **react-grid:** retrieve incomplete page from cache ([#2215](https://github.com/DevExpress/devextreme-reactive/issues/2215)) ([0ee86fd](https://github.com/DevExpress/devextreme-reactive/commit/0ee86fd))
* **scheduler-core:** fix incorrect render of recurrent appointments with BYMONTHDAY parameter ([#2216](https://github.com/DevExpress/devextreme-reactive/issues/2216)) ([7346df3](https://github.com/DevExpress/devextreme-reactive/commit/7346df3))


### Features

* **react-grid:** allow setting min and max width limitation for every column ([#2207](https://github.com/DevExpress/devextreme-reactive/issues/2207)) ([dc72916](https://github.com/DevExpress/devextreme-reactive/commit/dc72916))



# [2.0.2](https://github.com/DevExpress/devextreme-reactive/compare/v2.0.1...v2.0.2) (2019-08-01)


### Bug Fixes

* **react-chart:** fix tooltip customization ([#2191](https://github.com/DevExpress/devextreme-reactive/issues/2191)) ([b23bef2](https://github.com/DevExpress/devextreme-reactive/commit/b23bef2))
* **react-chart:** fix zooming over minimal threshold ([#2183](https://github.com/DevExpress/devextreme-reactive/issues/2183)) ([88baf47](https://github.com/DevExpress/devextreme-reactive/commit/88baf47))
* **react-chart-material-ui:** apply correct layout height ([#2180](https://github.com/DevExpress/devextreme-reactive/issues/2180)) ([88bf517](https://github.com/DevExpress/devextreme-reactive/commit/88bf517)), closes [#2172](https://github.com/DevExpress/devextreme-reactive/issues/2172)
* **react-core:** get rid of redundant type ([#2179](https://github.com/DevExpress/devextreme-reactive/issues/2179)) ([eb0ca11](https://github.com/DevExpress/devextreme-reactive/commit/eb0ca11))
* **react-grid:** correct calculation of available row count in infninite scrolling mode ([#2188](https://github.com/DevExpress/devextreme-reactive/issues/2188)) ([28e93d5](https://github.com/DevExpress/devextreme-reactive/commit/28e93d5))
* **react-grid:** correct changing DataTypeProvider.for property in runtime ([#2201](https://github.com/DevExpress/devextreme-reactive/issues/2201)) ([3732635](https://github.com/DevExpress/devextreme-reactive/commit/3732635))
* **react-grid:** correctly calculate rows to load when sorting/filtering in lazy loading mode  ([#2186](https://github.com/DevExpress/devextreme-reactive/issues/2186)) ([3789b89](https://github.com/DevExpress/devextreme-reactive/commit/3789b89))
* **react-grid:** prevent scrolling sticky header on Safari ([#2178](https://github.com/DevExpress/devextreme-reactive/issues/2178)) ([47666b7](https://github.com/DevExpress/devextreme-reactive/commit/47666b7))
* **react-scheduler:** set Scheduler's height to Root instead of body ([#2189](https://github.com/DevExpress/devextreme-reactive/issues/2189)) ([46bef67](https://github.com/DevExpress/devextreme-reactive/commit/46bef67))
* **react-scheduler-material-ui:** remove transparent border from draft appointment ([#2200](https://github.com/DevExpress/devextreme-reactive/issues/2200)) ([005336b](https://github.com/DevExpress/devextreme-reactive/commit/005336b))


### Performance Improvements

* **react-scheduler:** optimize render using React.memo  ([#2169](https://github.com/DevExpress/devextreme-reactive/issues/2169)) ([52a877c](https://github.com/DevExpress/devextreme-reactive/commit/52a877c))


### BREAKING CHANGES

* **react-scheduler:** `DayView` plugin's, `WeekView` plugin's and `MonthView` plugin's layout component now doesn't have the `height` property. `height` is now `Scheduler` plugin's root component property.

```diff
...
<DayView
  layoutComponent={({
-   height,
     ...restProps
  }) => (
    <DayView.Layout
-      height={height}
       {...restProps}
    />
  )}
/>
...
<WeekView
  layoutComponent={({
-   height,
     ...restProps
  }) => (
    <WeekView.Layout
-      height={height}
       {...restProps}
    />
  )}
/>
...
<MonthView
  layoutComponent={({
-   height,
     ...restProps
  }) => (
    <MonthView.Layout
-      height={height}
       {...restProps}
    />
  )}
/>
...
<Scheduler
  rootComponent={({
+   height,
     ...restProps
  }) => (
    <Scheduler.Root
+      height={height}
       {...restProps}
    />
  )}
/>
...
```



# [2.0.1](https://github.com/DevExpress/devextreme-reactive/compare/v2.0.0...v2.0.1) (2019-07-18)


### Bug Fixes

* **react-chart:** improve touch events on hover/select ([#2159](https://github.com/DevExpress/devextreme-reactive/issues/2159)) ([61ee79a](https://github.com/DevExpress/devextreme-reactive/commit/61ee79a))
* **react-grid:** correct stub cell render for GroupRow in virtual table ([#2157](https://github.com/DevExpress/devextreme-reactive/issues/2157)) ([1624947](https://github.com/DevExpress/devextreme-reactive/commit/1624947))
* **react-grid:** disable skeleton cells when local data is used ([#2153](https://github.com/DevExpress/devextreme-reactive/issues/2153)) ([920008f](https://github.com/DevExpress/devextreme-reactive/commit/920008f))
* **react-scheduler:** call editing actions by DnD only once ([#2163](https://github.com/DevExpress/devextreme-reactive/issues/2163)) ([5364254](https://github.com/DevExpress/devextreme-reactive/commit/5364254))
* **react-scheduler-material-ui:** set appointment's default color ([#2154](https://github.com/DevExpress/devextreme-reactive/issues/2154)) ([ea7c508](https://github.com/DevExpress/devextreme-reactive/commit/ea7c508))


### Performance Improvements

* **react-grid:** optimize render using React.memo ([#2137](https://github.com/DevExpress/devextreme-reactive/issues/2137)) ([bd65d53](https://github.com/DevExpress/devextreme-reactive/commit/bd65d53))



# [2.0.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.11.1...v2.0.0) (2019-07-08)

We released v2.0.0 today because we [migrated to material-ui v4](https://github.com/DevExpress/devextreme-reactive/pull/2060). For the time being, we will fix bugs in v1.x for those who need to remain on material-ui v3. We recommend updating to material-ui v4, since new features will only be included in v2.x.

### Bug Fixes

* **react-chart:** arg and val scale inconsistency ([#2070](https://github.com/DevExpress/devextreme-reactive/issues/2070)) ([6286577](https://github.com/DevExpress/devextreme-reactive/commit/6286577))
* **react-chart:** fix zooming on IPad ([#2122](https://github.com/DevExpress/devextreme-reactive/issues/2122)) ([41ebed6](https://github.com/DevExpress/devextreme-reactive/commit/41ebed6))
* **react-chart:** update ZoomAndPan plugin ts declaration ([#2109](https://github.com/DevExpress/devextreme-reactive/issues/2109)) ([6a81792](https://github.com/DevExpress/devextreme-reactive/commit/6a81792))
* **react-grid:** add grouping as optional dependency for summary ([#2097](https://github.com/DevExpress/devextreme-reactive/issues/2097)) ([12d633f](https://github.com/DevExpress/devextreme-reactive/commit/12d633f))
* **react-grid:** add TableGroupRow as optional dependency for TableFixedColumns ([#2112](https://github.com/DevExpress/devextreme-reactive/issues/2112)) ([be38da1](https://github.com/DevExpress/devextreme-reactive/commit/be38da1))
* **react-grid:** calculate summary for collapsed groups under first level ([#2106](https://github.com/DevExpress/devextreme-reactive/issues/2106)) ([f7c7655](https://github.com/DevExpress/devextreme-reactive/commit/f7c7655))
* **react-grid:** correct virtual table row boundaries for mui 4 ([#2144](https://github.com/DevExpress/devextreme-reactive/issues/2144)) ([ffc4681](https://github.com/DevExpress/devextreme-reactive/commit/ffc4681))
* **react-grid-bootstrap4:** make resize control visible on resizing ([#2103](https://github.com/DevExpress/devextreme-reactive/issues/2103)) ([3f875c5](https://github.com/DevExpress/devextreme-reactive/commit/3f875c5))
* **react-scheduler:** add capability to pass className and style into Scheduler layout component ([#2140](https://github.com/DevExpress/devextreme-reactive/issues/2140)) ([3177586](https://github.com/DevExpress/devextreme-reactive/commit/3177586))
* **react-scheduler:** fix no space between appointments bug in Firefox ([#2124](https://github.com/DevExpress/devextreme-reactive/issues/2124)) ([0016a8b](https://github.com/DevExpress/devextreme-reactive/commit/0016a8b))
* **react-scheduler:** remove excess commitChanges call by DnD ([#2123](https://github.com/DevExpress/devextreme-reactive/issues/2123)) ([044e188](https://github.com/DevExpress/devextreme-reactive/commit/044e188))
* **react-scheduler:** set px as measurement unit of MonthView today cell lineHeight ([#2145](https://github.com/DevExpress/devextreme-reactive/issues/2145)) ([25fd88a](https://github.com/DevExpress/devextreme-reactive/commit/25fd88a))
* **react-scheduler:** delete borders around Scheduler ([#2136](https://github.com/DevExpress/devextreme-reactive/pull/2136)) ([a5fe73f](https://github.com/DevExpress/devextreme-reactive/commit/2635773aa871cd7984d75ffdf62cdfe76a5fe73f))


### Code Refactoring

* **react-scheduler:** add display name to views ([#2134](https://github.com/DevExpress/devextreme-reactive/issues/2134)) ([4c20034](https://github.com/DevExpress/devextreme-reactive/commit/4c20034))
* **react-scheduler:** transfer DOM operations into theme package ([#2068](https://github.com/DevExpress/devextreme-reactive/issues/2068)) ([c851a48](https://github.com/DevExpress/devextreme-reactive/commit/c851a48))


### Features

* migrate to MUI v4 ([#2060](https://github.com/DevExpress/devextreme-reactive/issues/2060)) ([99ff97d](https://github.com/DevExpress/devextreme-reactive/commit/99ff97d))
* **react-chart:** rotated chart ([#2089](https://github.com/DevExpress/devextreme-reactive/issues/2089)) ([def0662](https://github.com/DevExpress/devextreme-reactive/commit/def0662))
* **react-scheduler:** add TodayButton plugin ([#2118](https://github.com/DevExpress/devextreme-reactive/issues/2118)) ([84ef5a3](https://github.com/DevExpress/devextreme-reactive/commit/84ef5a3))


### BREAKING CHANGES

* **react-scheduler:** `ViewSwitcher` plugin's switcher component now doesn't have the `currentViewName` and `availableViewNames` properties. To specify the current view name use `currentView` property consisting of 2 fields: `name` and `displayName`. To provide available views, use availableViews property, which is an array of elements with `name` and `displayName` fields.

```diff
...
<ViewSwitcher
  switcherComponent={({
-   currentViewName,
+   currentView,
-   avalableViewNames,
+   availableViews,
     ...restProps
  }) => (
    <ViewSwitcher.Switcher
-      currentViewName={currentViewName}
+      currentView={currentView}
-      availableViewNames={availableViewNames}
+      availableViews={availableViews}
       {...restProps}
    />
  )}
/>
...
```
* **react-scheduler:** `AllDayPanel` plugin's layout component now doesn't have the `allDayPanel` property. To specify cell elements use `setCellElementsMeta` property.

```diff
...
<AllDayyPanel
  layoutComponent={({
-   allDayPanelRef,
+   setCellElementsMeta,
     ...restProps
  }) => (
    <AllDayPanel.Layout>
-      allDayPanelRef={allDayPanelRef}
+      setCellElementsMeta={setCellElementsMeta}
       {...restProps}
    />
  )}
/>
...
```
* **react-chart:** The `x`, `y`, and `y1` properties in series points' coordinates have been renamed to `arg`, `val`, and `startVal` respectively. The old names were unsuitable in the case when the chart was rotated.



# [1.11.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.11.0...v1.11.1) (2019-06-14)


### Bug Fixes

* **react-chart:** fix strange text artifacts during scrolling ([#2081](https://github.com/DevExpress/devextreme-reactive/issues/2081)) ([e4f7fb2](https://github.com/DevExpress/devextreme-reactive/commit/e4f7fb2))
* **react-grid:** can not resize fixed column ([#2052](https://github.com/DevExpress/devextreme-reactive/issues/2052)) ([86495a4](https://github.com/DevExpress/devextreme-reactive/commit/86495a4))
* **react-grid:** change processing of last page in lazy load mode ([#2067](https://github.com/DevExpress/devextreme-reactive/issues/2067)) ([2b52fe0](https://github.com/DevExpress/devextreme-reactive/commit/2b52fe0))
* **react-grid:** Fixed column cell of selected row is not highlighted ([#2042](https://github.com/DevExpress/devextreme-reactive/issues/2042)) ([fda3d36](https://github.com/DevExpress/devextreme-reactive/commit/fda3d36))
* **react-grid:** use default color for selected fixed cell if highlight is disabled ([#2076](https://github.com/DevExpress/devextreme-reactive/issues/2076)) ([74a42ef](https://github.com/DevExpress/devextreme-reactive/commit/74a42ef))
* **react-scheduler:** update views by passing new props ([#2040](https://github.com/DevExpress/devextreme-reactive/issues/2040)) ([2cf4665](https://github.com/DevExpress/devextreme-reactive/commit/2cf4665))
* **scheduler-core:** consider seconds instead of milliseconds while calculate intervals ([#2064](https://github.com/DevExpress/devextreme-reactive/issues/2064)) ([e2b20a7](https://github.com/DevExpress/devextreme-reactive/commit/e2b20a7))


### Features

* **react-grid:** stick group row on horizontal scroll ([#2037](https://github.com/DevExpress/devextreme-reactive/issues/2037)) ([c063efe](https://github.com/DevExpress/devextreme-reactive/commit/c063efe))
* **react-scheduler:** add a capability to set Scheduler's height ([#2043](https://github.com/DevExpress/devextreme-reactive/issues/2043)) ([6c140a5](https://github.com/DevExpress/devextreme-reactive/commit/6c140a5))



# [1.11.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.11.0-beta.1...v1.11.0) (2019-05-17)


### Bug Fixes

* **react-chart:** fix layout of the value axes ([#1996](https://github.com/DevExpress/devextreme-reactive/issues/1996)) ([030f4b1](https://github.com/DevExpress/devextreme-reactive/commit/030f4b1))
* **react-chart:** fix spacing on axis labels in Edge ([#2006](https://github.com/DevExpress/devextreme-reactive/issues/2006)) ([568ba8a](https://github.com/DevExpress/devextreme-reactive/commit/568ba8a))
* **react-core:** prevent Getter losing on Plugin adding ([#2002](https://github.com/DevExpress/devextreme-reactive/issues/2002)) ([89f4e87](https://github.com/DevExpress/devextreme-reactive/commit/89f4e87))
* **react-grid:** add transform style for IE11 ([#2001](https://github.com/DevExpress/devextreme-reactive/issues/2001)) ([ef75b9c](https://github.com/DevExpress/devextreme-reactive/commit/ef75b9c))
* **react-grid:** consider fixed columns when columns are virtualized ([#2014](https://github.com/DevExpress/devextreme-reactive/issues/2014)) ([f13c525](https://github.com/DevExpress/devextreme-reactive/commit/f13c525))
* **react-grid:** provide minWidth to virtual table in Safari ([#2034](https://github.com/DevExpress/devextreme-reactive/issues/2034)) ([55a9d3d](https://github.com/DevExpress/devextreme-reactive/commit/55a9d3d))
* **react-scheduler:** move children inside ([#2018](https://github.com/DevExpress/devextreme-reactive/issues/2018)) ([bbd4198](https://github.com/DevExpress/devextreme-reactive/commit/bbd4198))
* **react-scheduler:** pass formatDate func into DnD drafts ([#2031](https://github.com/DevExpress/devextreme-reactive/issues/2031)) ([63df375](https://github.com/DevExpress/devextreme-reactive/commit/63df375))


### Features

* **react-scheduler:** support scheduler localization capability ([#1985](https://github.com/DevExpress/devextreme-reactive/issues/1985)) ([286003e](https://github.com/DevExpress/devextreme-reactive/commit/286003e))


### BREAKING CHANGES

* **react-chart:** We have replaced the `dominantBaseline` option with the `dy` option for axis labels because Edge does not support the former. The `dy` option does not change the baseline position and simply shifts text up or down.



# [1.11.0-beta.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.11.0-alpha.1...v1.11.0-beta.1) (2019-04-24)


### Bug Fixes

* **grid-core:** fix group summary rows order ([#1926](https://github.com/DevExpress/devextreme-reactive/issues/1926)) ([e9f3c60](https://github.com/DevExpress/devextreme-reactive/commit/e9f3c60))
* **react-chart:** fix event coordinates calculation in a scrolled container ([#1950](https://github.com/DevExpress/devextreme-reactive/issues/1950)) ([498969f](https://github.com/DevExpress/devextreme-reactive/commit/498969f))
* **react-chart:** fix generated dts ([#1927](https://github.com/DevExpress/devextreme-reactive/issues/1927)) ([5598e3c](https://github.com/DevExpress/devextreme-reactive/commit/5598e3c))
* **react-core:** ensure onSizeChange is triggered when browser zoom less than 100 ([#1900](https://github.com/DevExpress/devextreme-reactive/issues/1900)) ([b85b017](https://github.com/DevExpress/devextreme-reactive/commit/b85b017))
* **react-grid-bootstrap3:** add fallback position sticky css property for Safari ([#1964](https://github.com/DevExpress/devextreme-reactive/issues/1964)) ([7a1f4aa](https://github.com/DevExpress/devextreme-reactive/commit/7a1f4aa))
* **react-grid-bootstrap4:** correct Popover prop types ([#1901](https://github.com/DevExpress/devextreme-reactive/issues/1901)) ([c6131fc](https://github.com/DevExpress/devextreme-reactive/commit/c6131fc))


### Features

* **react-chart:** add zoom and pan for chart ([#1917](https://github.com/DevExpress/devextreme-reactive/issues/1917)) ([6c30b95](https://github.com/DevExpress/devextreme-reactive/commit/6c30b95))
* **react-grid:** add aria-labels for pager buttons ([#1906](https://github.com/DevExpress/devextreme-reactive/issues/1906)) ([0d2cf72](https://github.com/DevExpress/devextreme-reactive/commit/0d2cf72))
* **react-grid:** remote virtual scrolling ([#1936](https://github.com/DevExpress/devextreme-reactive/pull/1936)) ([43c967c0](https://github.com/DevExpress/devextreme-reactive/commit/43c967c0))
* **react-scheduler:** allow appointment resizing ([#1932](https://github.com/DevExpress/devextreme-reactive/issues/1932)) ([785f8a1](https://github.com/DevExpress/devextreme-reactive/commit/785f8a1))
* **react-scheduler:** allow recurrence appointment rendering ([#1956](https://github.com/DevExpress/devextreme-reactive/issues/1956)) ([c75f584](https://github.com/DevExpress/devextreme-reactive/commit/c75f584))


### Performance Improvements

* **react-grid:** avoid unnecessary row rerendering ([#1959](https://github.com/DevExpress/devextreme-reactive/issues/1959)) ([5225f4a](https://github.com/DevExpress/devextreme-reactive/commit/5225f4a)), closes [#1925](https://github.com/DevExpress/devextreme-reactive/issues/1925)

### BREAKING CHANGES

* **react-scheduler:**
  The `Appointment` component of the `Appointments` plugin has not received a `style` property. These styles have passed to the `Container` component of the `Appointments` plugin.

  Before
  ```html
  ...
  <Appointments
    appointmentComponent={({ style, children, data, onClick?, onDoubleClick? }) => ... }
    ...
  />
  ...
  ```
  After
  ```html
  ...
  <Appointments
    appointmentComponent={({ children, data, onClick?, onDoubleClick? }) => ... }
    containerComponent={({ style, children }) => ... }
    ...
  />
  ...
  ```

# [1.11.0-alpha.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.10.4...v1.11.0-alpha.1) (2019-03-13)


### Features

* **react-scheduler:** add editing by dragging ([#1870](https://github.com/DevExpress/devextreme-reactive/issues/1870)) ([238f696](https://github.com/DevExpress/devextreme-reactive/commit/238f696))



# [1.10.4](https://github.com/DevExpress/devextreme-reactive/compare/v1.10.3...v1.10.4) (2019-03-11)


### Bug Fixes

* **react-core:** correct IDependency definition ([#1891](https://github.com/DevExpress/devextreme-reactive/issues/1891)) ([c9d0f44](https://github.com/DevExpress/devextreme-reactive/commit/c9d0f44))
* **react-grid:** correct typescript definitions ([#1876](https://github.com/DevExpress/devextreme-reactive/issues/1876)) ([404a239](https://github.com/DevExpress/devextreme-reactive/commit/404a239))



# [1.10.3](https://github.com/DevExpress/devextreme-reactive/compare/v1.10.2...v1.10.3) (2019-02-27)


### Bug Fixes

* **react-grid:** fix dependencies ([#1873](https://github.com/DevExpress/devextreme-reactive/issues/1873)) ([1f3d9ae](https://github.com/DevExpress/devextreme-reactive/commit/1f3d9ae))



# [1.10.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.10.1...v1.10.2) (2019-02-27)


### Bug Fixes

* **grid-core:** fix equal/notEqual filtering operations ([#1834](https://github.com/DevExpress/devextreme-reactive/issues/1834)) ([8ff84e6](https://github.com/DevExpress/devextreme-reactive/commit/8ff84e6))
* **grid-core:** fix filter selector value calculation ([#1831](https://github.com/DevExpress/devextreme-reactive/issues/1831)) ([5ab35a5](https://github.com/DevExpress/devextreme-reactive/commit/5ab35a5))
* **react-core:** notify Sizer content when container size is increasing ([#1828](https://github.com/DevExpress/devextreme-reactive/issues/1828)) ([b58e1bd](https://github.com/DevExpress/devextreme-reactive/commit/b58e1bd))
* **react-chart:** fix line target element getter ([#1847](https://github.com/DevExpress/devextreme-reactive/issues/1847)) ([688a8e9](https://github.com/DevExpress/devextreme-reactive/commit/688a8e9))
* **react-grid:** fix borders of fixed columns in Edge ([#1849](https://github.com/DevExpress/devextreme-reactive/issues/1849)) ([5d1763e](https://github.com/DevExpress/devextreme-reactive/commit/5d1763e))
* **react-grid:** fix virtual table column width in Edge ([#1866](https://github.com/DevExpress/devextreme-reactive/issues/1866)) ([5d58a58](https://github.com/DevExpress/devextreme-reactive/commit/5d58a58))
* **react-grid:** prevent converting group row value to a string if it is undefined ([#1824](https://github.com/DevExpress/devextreme-reactive/issues/1824)) ([c878d33](https://github.com/DevExpress/devextreme-reactive/commit/c878d33))
* **react-grid-material-ui:** fix page size selector alignment in FF ([#1839](https://github.com/DevExpress/devextreme-reactive/issues/1839)) ([5a79b30](https://github.com/DevExpress/devextreme-reactive/commit/5a79b30))

### Code Refactoring

* **chart-core**: migrate chart core to TS ([#1816](https://github.com/DevExpress/devextreme-reactive/issues/1816)) ([23a17e8](https://github.com/DevExpress/devextreme-reactive/commit/23a17e8))
* **scheduler-core**: migrate to TypeScript ([#1809](https://github.com/DevExpress/devextreme-reactive/issues/1809)) ([4c5c52](https://github.com/DevExpress/devextreme-reactive/commit/4c5c52))
* **react-grid**: migrate to TS ([#1832](https://github.com/DevExpress/devextreme-reactive/issues/1832)) ([4bacf20](https://github.com/DevExpress/devextreme-reactive/commit/4bacf20))
* **react-grid**: fix sorting state props type ([#1850](https://github.com/DevExpress/devextreme-reactive/issues/1850)) ([7b5b720](https://github.com/DevExpress/devextreme-reactive/commit/7b5b720))
* **react-grid-demos**: replace modal dialog with confirmation in featured editing demo ([#1871](https://github.com/DevExpress/devextreme-reactive/issues/1871)) ([66faabf](https://github.com/DevExpress/devextreme-reactive/commit/66faabf))


# [1.10.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.10.0...v1.10.1) (2019-02-06)


### Bug Fixes

* **react-chart:** fix hovered and selected scatter point size ([#1808](https://github.com/DevExpress/devextreme-reactive/issues/1808)) ([647a0d8](https://github.com/DevExpress/devextreme-reactive/commit/647a0d8))
* **react-chart:** fix-event-handlers-in-safari ([#1803](https://github.com/DevExpress/devextreme-reactive/issues/1803)) ([cc90bc0](https://github.com/DevExpress/devextreme-reactive/commit/cc90bc0))
* **react-chart-bootstrap4:** fix dependencies section ([#1774](https://github.com/DevExpress/devextreme-reactive/issues/1774)) ([12e9f6f](https://github.com/DevExpress/devextreme-reactive/commit/12e9f6f))
* **react-grid:** disallow rendering a checkbox in incorrect column when grouping is enabled ([#1793](https://github.com/DevExpress/devextreme-reactive/issues/1793)) ([96b7de0](https://github.com/DevExpress/devextreme-reactive/commit/96b7de0))
* **react-grid:** fix column width in virtual table ([#1783](https://github.com/DevExpress/devextreme-reactive/issues/1783)) ([f3c481c](https://github.com/DevExpress/devextreme-reactive/commit/f3c481c))
* **react-grid:** prevent tree column header text from overflowing a container ([#1731](https://github.com/DevExpress/devextreme-reactive/issues/1731)) ([af3629c](https://github.com/DevExpress/devextreme-reactive/commit/af3629c))
* **react-grid:** stretch table container to a container size ([#1796](https://github.com/DevExpress/devextreme-reactive/issues/1796)) ([a36b109](https://github.com/DevExpress/devextreme-reactive/commit/a36b109))


### Code Refactoring

* **react-chart:** move point coordinates calculations specifics down to the pointComponent ([#1753](https://github.com/DevExpress/devextreme-reactive/issues/1753)) ([fde7756](https://github.com/DevExpress/devextreme-reactive/commit/fde7756))


### Features

* **react-grid:** throw warning if getRowId returns undefined ([#1679](https://github.com/DevExpress/devextreme-reactive/issues/1679)) ([d10397e](https://github.com/DevExpress/devextreme-reactive/commit/d10397e))


### Performance Improvements

* **react-core:** optimize position context calculation ([#1813](https://github.com/DevExpress/devextreme-reactive/issues/1813)) ([b2ea6e7](https://github.com/DevExpress/devextreme-reactive/commit/b2ea6e7))


### BREAKING CHANGES

* **react-chart:**
  Previously, `pointComponent` of `BarSeries` and `PieSeries` accepted precalculated fields (`width` and `d`, respectively). Now, `pointComponent` accepts fields that provide raw data for calculation. This makes `pointComponent` more flexible as the `width` and `d` fields can now be calculated the way you need.

  The following substitutions took place:
 
  - `width` => `barWidth` and `maxBarWidth`
  - `d` => `innerRadius`, `outerRadius`, `maxRadius`, `startAngle`, and `endAngle`


# [1.10.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.9.1...v1.10.0) (2018-12-25)


### Bug Fixes

* **react-chart:** fix resizing of the axes ([#1685](https://github.com/DevExpress/devextreme-reactive/issues/1685)) ([7c409f0](https://github.com/DevExpress/devextreme-reactive/commit/7c409f0))
* **react-chart:** fix-pie-legend ([#1714](https://github.com/DevExpress/devextreme-reactive/issues/1714)) ([d662409](https://github.com/DevExpress/devextreme-reactive/commit/d662409))
* **react-core-demos:** fix the 'Template Overriding' demo ([#1729](https://github.com/DevExpress/devextreme-reactive/issues/1729)) ([a119cb4](https://github.com/DevExpress/devextreme-reactive/commit/a119cb4))
* **react-grid:** apply wordWrapEnabled property to TableTreeColumn ([#1721](https://github.com/DevExpress/devextreme-reactive/issues/1721)) ([336c88a](https://github.com/DevExpress/devextreme-reactive/commit/336c88a))
* **react-grid:** fix header layout when middle band column is fixed ([#1619](https://github.com/DevExpress/devextreme-reactive/issues/1619)) ([504f434](https://github.com/DevExpress/devextreme-reactive/commit/504f434))
* **react-grid:** pass actual properties to a tableLayout in VirtualTable ([#1690](https://github.com/DevExpress/devextreme-reactive/issues/1690)) ([ac609f2](https://github.com/DevExpress/devextreme-reactive/commit/ac609f2))
* **react-grid:** prevent animation flicker on column visibility change ([#1674](https://github.com/DevExpress/devextreme-reactive/issues/1674)) ([2cbb72a](https://github.com/DevExpress/devextreme-reactive/commit/2cbb72a))
* **react-grid:** prevent virtual table from setting a width to flex column ([#1691](https://github.com/DevExpress/devextreme-reactive/issues/1691)) ([6d28bfb](https://github.com/DevExpress/devextreme-reactive/commit/6d28bfb))
* **react-grid:** specify table fixed columns plugin optional dependencies ([#1693](https://github.com/DevExpress/devextreme-reactive/issues/1693)) ([3564212](https://github.com/DevExpress/devextreme-reactive/commit/3564212))
* **react-scheduler:** add to AllDayPanel another cell template name ([#1719](https://github.com/DevExpress/devextreme-reactive/issues/1719)) ([386728f](https://github.com/DevExpress/devextreme-reactive/commit/386728f))
* **react-scheduler:** fix date navigator button width ([#1699](https://github.com/DevExpress/devextreme-reactive/issues/1699)) ([7093d7b](https://github.com/DevExpress/devextreme-reactive/commit/7093d7b))
* update [@material-ui](https://github.com/material-ui)/core to 3.7.0 ([#1718](https://github.com/DevExpress/devextreme-reactive/issues/1718)) ([ce5d4fe](https://github.com/DevExpress/devextreme-reactive/commit/ce5d4fe))


### Code Refactoring

* **react-chart:** replace Scale plugin with ArgumentScale and ValueScale ([#1650](https://github.com/DevExpress/devextreme-reactive/issues/1650)) ([1f2e0b2](https://github.com/DevExpress/devextreme-reactive/commit/1f2e0b2))
* **react-chart:** rename "showGrids" Axis property ([#1696](https://github.com/DevExpress/devextreme-reactive/issues/1696)) ([f8087da](https://github.com/DevExpress/devextreme-reactive/commit/f8087da))
* **react-chart:** property to customize scale domain ([#1711](https://github.com/DevExpress/devextreme-reactive/issues/1711)) ([b09e439](https://github.com/DevExpress/devextreme-reactive/commit/b09e439))


### BREAKING CHANGES

* **react-chart:**
Previously the `ArgumentAxis`, `ValueAxis`, and `Scale` plugins allowed you to customize argument and value scales. In this release, we have implemented the `ArgumentScale` and `ValueScale` plugins for this purpose.

* **react-chart:**
The `showGrids` *Axis* property is renamed to `showGrid`.

* **react-chart:**
The `min` and `max` scale properties are replaced with the `modifyDomain` property because the *band* scale domain cannot be customized in *min* and *max* terms.

  Replace this

  ```javascript
  <ArgumentScale min={0} max={10} ... />
  ```

  with this

  ```javascript
  const modifyDomain = () => [0, 10];

  <ArgumentScale modifyDomain={modifyDomain} ... />
  ```


# [1.9.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.9.0...v1.9.1) (2018-12-07)


### Bug Fixes

* **docs:** correct the Appointments plugin docs ([#1633](https://github.com/DevExpress/devextreme-reactive/issues/1633)) ([87b2988](https://github.com/DevExpress/devextreme-reactive/commit/87b2988))
* **docs:** correct the table summary row plugin docs ([#1632](https://github.com/DevExpress/devextreme-reactive/issues/1632)) ([0ab1145](https://github.com/DevExpress/devextreme-reactive/commit/0ab1145))
* **react-grid:** fix the 'no data' message alignment ([#1597](https://github.com/DevExpress/devextreme-reactive/issues/1597)) ([663685a](https://github.com/DevExpress/devextreme-reactive/commit/663685a)), closes [#1600](https://github.com/DevExpress/devextreme-reactive/issues/1600)
* **react-grid:** fix virtual table layout in Edge ([#1593](https://github.com/DevExpress/devextreme-reactive/issues/1593)) ([65fdf63](https://github.com/DevExpress/devextreme-reactive/commit/65fdf63))
* **react-grid:** normalize scroll position in Edge browser ([#1605](https://github.com/DevExpress/devextreme-reactive/issues/1605)) ([7e313ce](https://github.com/DevExpress/devextreme-reactive/commit/7e313ce))
* **react-grid-bootstrap4:** prevent edge from overlapping a scrollbar ([#1612](https://github.com/DevExpress/devextreme-reactive/issues/1612)) ([2fc8a6b](https://github.com/DevExpress/devextreme-reactive/commit/2fc8a6b))
* **react-scheduler:** add cursor pointer to appointment template ([#1594](https://github.com/DevExpress/devextreme-reactive/issues/1594)) ([d5db46d](https://github.com/DevExpress/devextreme-reactive/commit/d5db46d))
* **react-scheduler:** fix TypeScript definitions for the 'dx-react-scheduler-material-ui' package ([#1644](https://github.com/DevExpress/devextreme-reactive/issues/1644)) ([aa93cd1](https://github.com/DevExpress/devextreme-reactive/commit/aa93cd1))
* **react-scheduler:** remove excess events from an appointment ([#1591](https://github.com/DevExpress/devextreme-reactive/issues/1591)) ([ceba7de](https://github.com/DevExpress/devextreme-reactive/commit/ceba7de))
* **site:** fix the 'Why We Use Cookies' message ([#1655](https://github.com/DevExpress/devextreme-reactive/issues/1655)) ([3e66474](https://github.com/DevExpress/devextreme-reactive/commit/3e66474))


### Code Refactoring

* **react-scheduler:** simplify the ViewSwitcher.Switcher component API ([#1660](https://github.com/DevExpress/devextreme-reactive/issues/1660)) ([6c5d5ca](https://github.com/DevExpress/devextreme-reactive/commit/6c5d5ca))
* **react-scheduler:** simplify the onNavigate function arguments ([#1659](https://github.com/DevExpress/devextreme-reactive/issues/1659)) ([7e4104](https://github.com/DevExpress/devextreme-reactive/commit/7e4104))
* **react-chart:** make grid part of the axis ([#1646](https://github.com/DevExpress/devextreme-reactive/issues/1646)) ([4d99c93](https://github.com/DevExpress/devextreme-reactive/commit/4d99c93))


### Features

* **react-chart:** add tooltip plugin ([#1611](https://github.com/DevExpress/devextreme-reactive/issues/1611)) ([1f9322c](https://github.com/DevExpress/devextreme-reactive/commit/1f9322c))
* **react-grid:** provide a way to customize a group cell ([#1596](https://github.com/DevExpress/devextreme-reactive/issues/1596)) ([d95a0cb](https://github.com/DevExpress/devextreme-reactive/commit/d95a0cb))
* **react-grid:** provide a way to customize a summary item ([#1567](https://github.com/DevExpress/devextreme-reactive/issues/1567)) ([f131c1c](https://github.com/DevExpress/devextreme-reactive/commit/f131c1c))
* **react-scheduler:** highlight today DayScale cell ([#1653](https://github.com/DevExpress/devextreme-reactive/issues/1653)) ([eb42d14](https://github.com/DevExpress/devextreme-reactive/commit/eb42d14))


### BREAKING CHANGES

* **react-scheduler:**
We have changed the `onChange` function's argument type to make the `ViewSwitcher`'s API more clear.

  Previously:
  ```
  onChange({ nextViewName: string }) => void
  ```

  Now:
  ```
  onChange(nextViewName: string) => void
  ```

* **react-scheduler:**
We changed the `onNavigate` function's argument type to make the `DateNavigator`'s API more clear.

  Previously:
  ```
  onNavigate({ back: boolean }) => void
  ```

  Now:
  ```
  onNavigate(direction: 'forward' | 'back') => void
  ```

* **react-chart:**
1. In the `ArgumentAxis` and `ValueAxis` plugins `lineComponent` and `tickComponent` render identical svg-path elements. Previously, they require different properties for drawing: `width` and `height` for `lineComponent` and `x1`, `x2`, `y1`, `y2` for `tickComponent`.
  Now, for more consistency the `lineComponent` requires the same properties as `tickComponent`.

1. Previously, there were `ArgumentGrid` and `ValueGrid` plugins that render grid lines for axes. Now, grids are part of the axes:

    ```
    <ArgumentAxis showGrids />
    <ValueAxis />
    ```

    For grid customization, use `gridComponent` as follows:

    ```
    <ArgumentAxis gridComponent={...} />
    <ValueAxis gridComponent={...} />
    ```


<a name="1.9.0"></a>
# [1.9.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.8.0...v1.9.0) (2018-11-07)


### Bug Fixes

* **react-chart:** fix indent from axis for label w/o tick and line components ([#1528](https://github.com/DevExpress/devextreme-reactive/issues/1528)) ([e8b2ccb](https://github.com/DevExpress/devextreme-reactive/commit/e8b2ccb))
* **react-chart:** fix stacks processing ([#1535](https://github.com/DevExpress/devextreme-reactive/issues/1535)) ([9660d5f](https://github.com/DevExpress/devextreme-reactive/commit/9660d5f))
* **react-grid:** correct order of fixed right columns ([#1533](https://github.com/DevExpress/devextreme-reactive/issues/1533)) ([00ccebd](https://github.com/DevExpress/devextreme-reactive/commit/00ccebd))
* **react-grid:** pass undefined as empty value to filter editorComponent ([#1522](https://github.com/DevExpress/devextreme-reactive/issues/1522)) ([e69813f](https://github.com/DevExpress/devextreme-reactive/commit/e69813f))
* **react-grid:** use a column filter operation as a filter selector value ([#1479](https://github.com/DevExpress/devextreme-reactive/issues/1479)) ([70e26fa](https://github.com/DevExpress/devextreme-reactive/commit/70e26fa)), closes [#1474](https://github.com/DevExpress/devextreme-reactive/issues/1474)
* **react-grid-bootstrap3/4:** prevent sorting for disabled columns ([#1490](https://github.com/DevExpress/devextreme-reactive/issues/1490)) ([086242d](https://github.com/DevExpress/devextreme-reactive/commit/086242d))
* **react-grid-bootstrap4:** fix position of dragged column header ([#1513](https://github.com/DevExpress/devextreme-reactive/issues/1513)) ([8e0893c](https://github.com/DevExpress/devextreme-reactive/commit/8e0893c))
* **react-grid-bootstrap4:** prevent filter popup cut off on fixed columns ([#1576](https://github.com/DevExpress/devextreme-reactive/issues/1576)) ([979476e](https://github.com/DevExpress/devextreme-reactive/commit/979476e))


### Features

* **react-scheduler:** add the React Scheduler component
* **react-chart:** add animation plugin ([#1469](https://github.com/DevExpress/devextreme-reactive/issues/1469)) ([3c41352](https://github.com/DevExpress/devextreme-reactive/commit/3c41352))
* update dependencies ([#1542](https://github.com/DevExpress/devextreme-reactive/issues/1542)) ([f32f1b2](https://github.com/DevExpress/devextreme-reactive/commit/f32f1b2))


### Code Refactoring

* **react-chart:** remove "groupWidth" property from BarSeries ([0a15e87](https://github.com/DevExpress/devextreme-reactive/commit/0a15e87))

### BREAKING CHANGES

* **react-chart:** The `groupWidth` property configures a band scale for arguments - it is not a property of a particular bar series.
To configure a band scale, use the `Scale` plugin as follows:

```javascript
<Scale extensions={[{ type: 'band', constructor: d3.scaleBand().paddingOuter(0.1).paddingInner(0.2) }]} />
```



<a name="1.8.0"></a>
# [1.8.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.8.0-beta.1...v1.8.0) (2018-10-04)


### Bug Fixes

* **grid:** add missed props to documentation ([#1414](https://github.com/DevExpress/devextreme-reactive/issues/1414)) ([e7fe289](https://github.com/DevExpress/devextreme-reactive/commit/e7fe289)), closes [#1412](https://github.com/DevExpress/devextreme-reactive/issues/1412)
* **grid:** fix nullable values sorting ([#1432](https://github.com/DevExpress/devextreme-reactive/issues/1432)) ([f75deb1](https://github.com/DevExpress/devextreme-reactive/commit/f75deb1)), closes [#1428](https://github.com/DevExpress/devextreme-reactive/issues/1428)
* **react:** handle event changes correctly ([#1405](https://github.com/DevExpress/devextreme-reactive/issues/1405)) ([61732a1](https://github.com/DevExpress/devextreme-reactive/commit/61732a1))
* **react-chart:** fix crash in production caused by PropTypes reference ([fd386f5](https://github.com/DevExpress/devextreme-reactive/commit/fd386f5))
* **react-chart:** bind default domain names for argument and value axes ([#1435](https://github.com/DevExpress/devextreme-reactive/issues/1435)) ([0a5fdf1](https://github.com/DevExpress/devextreme-reactive/commit/0a5fdf1))
* **react-grid:** add lost border to bands ([#1440](https://github.com/DevExpress/devextreme-reactive/issues/1440)) ([f051c69](https://github.com/DevExpress/devextreme-reactive/commit/f051c69))
* **react-grid:** fix virtual scrolling in desktop Safari ([#1397](https://github.com/DevExpress/devextreme-reactive/issues/1397)) ([d353edf](https://github.com/DevExpress/devextreme-reactive/commit/d353edf))
* **react-grid-material-ui:** update MUI ([#1430](https://github.com/DevExpress/devextreme-reactive/issues/1430)) ([c6ef66c](https://github.com/DevExpress/devextreme-reactive/commit/c6ef66c)), closes [#1413](https://github.com/DevExpress/devextreme-reactive/issues/1413)


### Features

* **react-chart:** add legend for pie chart ([#1393](https://github.com/DevExpress/devextreme-reactive/issues/1393)) ([088767c](https://github.com/DevExpress/devextreme-reactive/commit/088767c))
* **react-chart:** add palette plugin ([#1408](https://github.com/DevExpress/devextreme-reactive/issues/1408)) ([a025bb0](https://github.com/DevExpress/devextreme-reactive/commit/a025bb0))
* **react-grid:** extract ToggleButton component in TableFilterRow ([#1403](https://github.com/DevExpress/devextreme-reactive/issues/1403)) ([687fe3b](https://github.com/DevExpress/devextreme-reactive/commit/687fe3b))


### BREAKING CHANGES

* **react-chart:** Previously, there was a single `Grid` plugin. Now there are `ArgumentGrid` and `ValueGrid` plugins.
`ArgumentGrid` is bound to an argument domain.
`ValueGrid` is bound to a value domain specified by the name property or to a default domain.

* **react-chart:** Previously, the Chart component configured scales internally. Starting with this release, we extracted the scale customization logic to a separate plugin to enable a user to customize a scale. Now, you need to manually add the `Scale` plugin to the Chart component to draw a chart.


<a name="1.8.0-beta.1"></a>
# [1.8.0-beta.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.7.2...v1.8.0-beta.1) (2018-09-07)


### Bug Fixes

* **react-chart:** fix console errors about equal keys in axis ([#1375](https://github.com/DevExpress/devextreme-reactive/issues/1375)) ([cc9d9f9](https://github.com/DevExpress/devextreme-reactive/commit/cc9d9f9))
* **react-chart:** fix domain calculation with zero values ([#1383](https://github.com/DevExpress/devextreme-reactive/issues/1383)) ([1b514db](https://github.com/DevExpress/devextreme-reactive/commit/1b514db))
* **react-chart:** fix style applying in legend label in material-ui ([#1374](https://github.com/DevExpress/devextreme-reactive/issues/1374)) ([38e3ed4](https://github.com/DevExpress/devextreme-reactive/commit/38e3ed4))
* **react-chart:** fix wrong position of scatter points ([#1384](https://github.com/DevExpress/devextreme-reactive/issues/1384)) ([8f8ae54](https://github.com/DevExpress/devextreme-reactive/commit/8f8ae54))


### Features

* **react-grid:** extract sorting control ([#881](https://github.com/DevExpress/devextreme-reactive/issues/881)) ([2a6dd1a](https://github.com/DevExpress/devextreme-reactive/commit/2a6dd1a))
* **react-grid:** support columns fixing ([#1305](https://github.com/DevExpress/devextreme-reactive/issues/1305)) ([81c13a4](https://github.com/DevExpress/devextreme-reactive/commit/81c13a4))

### BREAKING CHANGES

* **react-grid:**
Because we extracted the sorting control, the `getMessage` property was moved from the `TableHeaderRow.CellProps` interface to `TableHeaderRow.SortLabelProps`. This property returns the sort label's text.

<a name="1.7.2"></a>
# [1.7.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.7.1...v1.7.2) (2018-08-31)


### Bug Fixes

* **react:** fix bundling ([#1376](https://github.com/DevExpress/devextreme-reactive/issues/1376)) ([00f0216](https://github.com/DevExpress/devextreme-reactive/commit/00f0216))



<a name="1.7.1"></a>
# [1.7.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.7.0...v1.7.1) (2018-08-31)


### Bug Fixes

* **grid:** fix group row level key calculation ([#1359](https://github.com/DevExpress/devextreme-reactive/issues/1359)) ([dfec46e](https://github.com/DevExpress/devextreme-reactive/commit/dfec46e)), closes [#1355](https://github.com/DevExpress/devextreme-reactive/issues/1355)
* **react:** prevent the 'process.env' value usage in umd bundles ([#1363](https://github.com/DevExpress/devextreme-reactive/issues/1363)) ([29468da](https://github.com/DevExpress/devextreme-reactive/commit/29468da))



<a name="1.7.0"></a>
# [1.7.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.6.1...v1.7.0) (2018-08-23)


### Bug Fixes

* **grid:** fix sorting with undefined values ([#1348](https://github.com/DevExpress/devextreme-reactive/issues/1348)) ([8342724](https://github.com/DevExpress/devextreme-reactive/commit/8342724)), closes [#1344](https://github.com/DevExpress/devextreme-reactive/issues/1344)
* **react:** remove prop types in production mode ([#1331](https://github.com/DevExpress/devextreme-reactive/issues/1331)) ([f0020c8](https://github.com/DevExpress/devextreme-reactive/commit/f0020c8))
* **react-chart:** fix console warning about equal keys ([#1340](https://github.com/DevExpress/devextreme-reactive/issues/1340)) ([fd58312](https://github.com/DevExpress/devextreme-reactive/commit/fd58312))
* **react-chart:** fix drawing spline ([#1341](https://github.com/DevExpress/devextreme-reactive/issues/1341)) ([e6f5d72](https://github.com/DevExpress/devextreme-reactive/commit/e6f5d72))
* **react-chart:** fix errors for BarSeries plugin ([#1349](https://github.com/DevExpress/devextreme-reactive/issues/1349)) ([5784cda](https://github.com/DevExpress/devextreme-reactive/commit/5784cda))
* **react-grid:** add missed optionals to docs ([#1347](https://github.com/DevExpress/devextreme-reactive/issues/1347)) ([1902196](https://github.com/DevExpress/devextreme-reactive/commit/1902196)), closes [#1343](https://github.com/DevExpress/devextreme-reactive/issues/1343)
* **vue-grid:** fix functional components ([#1350](https://github.com/DevExpress/devextreme-reactive/issues/1350)) ([5aa21a2](https://github.com/DevExpress/devextreme-reactive/commit/5aa21a2)), closes [#1345](https://github.com/DevExpress/devextreme-reactive/issues/1345)


### Chores

* **react-chart:** refactor series ([#1279](https://github.com/DevExpress/devextreme-reactive/issues/1279)) ([9634390](https://github.com/DevExpress/devextreme-reactive/commit/9634390)), closes [#1271](https://github.com/DevExpress/devextreme-reactive/issues/1271)


### BREAKING CHANGES

* **react-chart:** Previously, we had the pointComponent property for drawing and customizing LineSeries, SplineSeries, and AreaSeries plugin points. But since we have a scatter series, this property has become unnecessary. Use the ScatterSeries plugin or customize the pathComponent of the corresponding plugin.



<a name="1.6.1"></a>
# [1.6.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.6.0...v1.6.1) (2018-08-21)


### Bug Fixes

* **react-grid:** remove resizing animation ([#1333](https://github.com/DevExpress/devextreme-reactive/issues/1333)) ([5c0e748](https://github.com/DevExpress/devextreme-reactive/commit/5c0e748))
* **react:** fix adding existing plugins ([#1328](https://github.com/DevExpress/devextreme-reactive/issues/1333)) ([e773303](https://github.com/DevExpress/devextreme-reactive/commit/e773303))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.5.1...v1.6.0) (2018-08-17)


### Bug Fixes

* **grid:** add missed action argument ([#1292](https://github.com/DevExpress/devextreme-reactive/issues/1292)) ([f60e162](https://github.com/DevExpress/devextreme-reactive/commit/f60e162))
* **grid:** correct types for the commit changes event ([#1291](https://github.com/DevExpress/devextreme-reactive/issues/1291)) ([2f02936](https://github.com/DevExpress/devextreme-reactive/commit/2f02936))
* **react-grid:** fix word wrap behavior with the SortingControl ([#1280](https://github.com/DevExpress/devextreme-reactive/issues/1280)) ([45d5729](https://github.com/DevExpress/devextreme-reactive/commit/45d5729)), closes [#1278](https://github.com/DevExpress/devextreme-reactive/issues/1278)


### Features

* **react-grid:** allow showing row summaries ([#1216](https://github.com/DevExpress/devextreme-reactive/issues/1216)) ([e2397d1](https://github.com/DevExpress/devextreme-reactive/commit/e2397d1)), closes [#1024](https://github.com/DevExpress/devextreme-reactive/issues/1024)
* **react-grid:** export nested component interfaces in theme packages ([#1299](https://github.com/DevExpress/devextreme-reactive/issues/1299)) ([788bac9](https://github.com/DevExpress/devextreme-reactive/commit/788bac9))



<a name="1.5.1"></a>
# [1.5.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.5.0...v1.5.1) (2018-07-31)


### Bug Fixes

* **react-grid:** fix incorrect filter operation updating ([#1270](https://github.com/DevExpress/devextreme-reactive/issues/1270)) ([ed9fa16](https://github.com/DevExpress/devextreme-reactive/commit/ed9fa16)), closes [#1269](https://github.com/DevExpress/devextreme-reactive/issues/1269)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.4.0...v1.5.0) (2018-07-26)


### Bug Fixes

* **core:** fix incorrect template rendering on mount/unmount ([#1232](https://github.com/DevExpress/devextreme-reactive/issues/1232)) ([cd03c72](https://github.com/DevExpress/devextreme-reactive/commit/cd03c72))
* **docs:** correct the 'EditingState' plugin docs ([#1226](https://github.com/DevExpress/devextreme-reactive/issues/1226)) ([b8735b6](https://github.com/DevExpress/devextreme-reactive/commit/b8735b6)), closes [#1223](https://github.com/DevExpress/devextreme-reactive/issues/1223)
* **grid:** add missed operation field in Filter config ([#1233](https://github.com/DevExpress/devextreme-reactive/issues/1233)) ([dc6114b](https://github.com/DevExpress/devextreme-reactive/commit/dc6114b))
* **grid:** allow use word wrap with the Sorting feature ([#1238](https://github.com/DevExpress/devextreme-reactive/issues/1238)) ([adc2d19](https://github.com/DevExpress/devextreme-reactive/commit/adc2d19)), closes [#1237](https://github.com/DevExpress/devextreme-reactive/issues/1237)
* **grid:** fix VirtualTable with non-standard browser zooming ([#1243](https://github.com/DevExpress/devextreme-reactive/issues/1243)) ([412ba38](https://github.com/DevExpress/devextreme-reactive/commit/412ba38))
* **grid-core:** fix incorrect filter updating ([#1267](https://github.com/DevExpress/devextreme-reactive/issues/1267)) ([16580ab](https://github.com/DevExpress/devextreme-reactive/commit/16580ab)), closes [#1262](https://github.com/DevExpress/devextreme-reactive/issues/1262)
* **react-grid-material-ui:** get rid old palette syntax ([#1247](https://github.com/DevExpress/devextreme-reactive/issues/1247)) ([1a7218f](https://github.com/DevExpress/devextreme-reactive/commit/1a7218f)), closes [#1246](https://github.com/DevExpress/devextreme-reactive/issues/1246)
* **react-grid-material-ui:** rotate grid pagination arrows for RTL layouts ([#1244](https://github.com/DevExpress/devextreme-reactive/issues/1244)) ([f96501a](https://github.com/DevExpress/devextreme-reactive/commit/f96501a))


### Features

* **react-chart:** add API to manage series in stacks ([#1227](https://github.com/DevExpress/devextreme-reactive/issues/1227)) ([4239e7f](https://github.com/DevExpress/devextreme-reactive/commit/4239e7f))
* **react-grid:** support stretching virtual table to parent element ([#1261](https://github.com/DevExpress/devextreme-reactive/issues/1261)) ([ded7357](https://github.com/DevExpress/devextreme-reactive/commit/ded7357)), closes [#996](https://github.com/DevExpress/devextreme-reactive/issues/996)
* **vue-grid:** support tree data structuries ([#1115](https://github.com/DevExpress/devextreme-reactive/issues/1115)) ([3ce296c](https://github.com/DevExpress/devextreme-reactive/commit/3ce296c))


### Performance Improvements

* **core:** optimize rendering ([#1250](https://github.com/DevExpress/devextreme-reactive/issues/1250)) ([0a05e1c](https://github.com/DevExpress/devextreme-reactive/commit/0a05e1c))


### BREAKING CHANGES

* **react-chart:** The 'SeriesFamily' plugin has been renamed to 'Stack' to make it meaning more transparent.



<a name="1.4.0"></a>
# [1.4.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.3.0...v1.4.0) (2018-06-22)


### Bug Fixes

* **vue-grid:** fix spread messages property ([#1205](https://github.com/DevExpress/devextreme-reactive/issues/1205)) ([c19907f](https://github.com/DevExpress/devextreme-reactive/commit/c19907f))
* **vue-grid:** get rid excess attrs ([#1204](https://github.com/DevExpress/devextreme-reactive/issues/1204)) ([87a87cc](https://github.com/DevExpress/devextreme-reactive/commit/87a87cc))


### Features

* **react-chart:** add a capability to stretch the Chart component ([#1166](https://github.com/DevExpress/devextreme-reactive/issues/1166)) ([c038e7c](https://github.com/DevExpress/devextreme-reactive/commit/c038e7c))
* **vue-grid:** add column chooser ([#1150](https://github.com/DevExpress/devextreme-reactive/issues/1150)) ([ae6fdd0](https://github.com/DevExpress/devextreme-reactive/commit/ae6fdd0))
* **vue-grid:** add the Advanced filtering feature ([#1186](https://github.com/DevExpress/devextreme-reactive/issues/1186)) ([b5a468c](https://github.com/DevExpress/devextreme-reactive/commit/b5a468c))
* **vue-grid:** add the banded columns support ([#1131](https://github.com/DevExpress/devextreme-reactive/issues/1131)) ([71bd847](https://github.com/DevExpress/devextreme-reactive/commit/71bd847))
* **vue-grid:** add the Virtual Scrolling feature ([#1047](https://github.com/DevExpress/devextreme-reactive/issues/1047)) ([d0ba194](https://github.com/DevExpress/devextreme-reactive/commit/d0ba194))


### Performance Improvements

* **vue-grid:** optimize cell rendering ([#1172](https://github.com/DevExpress/devextreme-reactive/issues/1172)) ([5fa970e](https://github.com/DevExpress/devextreme-reactive/commit/5fa970e))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.3.0-beta.2...v1.3.0) (2018-06-04)


### Bug Fixes

* **grid-core:** remove excess property from TableRow component ([#1128](https://github.com/DevExpress/devextreme-reactive/issues/1128)) ([2c6ed12](https://github.com/DevExpress/devextreme-reactive/commit/2c6ed12))
* **react-grid:** fix double event call in strict mode ([#1157](https://github.com/DevExpress/devextreme-reactive/issues/1157)) ([e280eac](https://github.com/DevExpress/devextreme-reactive/commit/e280eac))
* **vue-grid-bootstrap4:** change grouping indent ([#1127](https://github.com/DevExpress/devextreme-reactive/issues/1127)) ([a450470](https://github.com/DevExpress/devextreme-reactive/commit/a450470))


### Features

* **react-grid:** support filtering operations ([#976](https://github.com/DevExpress/devextreme-reactive/issues/976)) ([5151d78](https://github.com/DevExpress/devextreme-reactive/commit/5151d78))



<a name="1.3.0-beta.2"></a>
# [1.3.0-beta.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.3.0-beta.1...v1.3.0-beta.2) (2018-05-24)


### Bug Fixes

* **react:** update material-ui to 1.0.0 ([#1108](https://github.com/DevExpress/devextreme-reactive/issues/1108)) ([0fb5ba7](https://github.com/DevExpress/devextreme-reactive/commit/0fb5ba7))



<a name="1.3.0-beta.1"></a>
# [1.3.0-beta.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.2.0...v1.3.0-beta.1) (2018-05-16)


### Bug Fixes

* **react-grid:** always pass the whole Filter object to the filter table cells ([#1011](https://github.com/DevExpress/devextreme-reactive/issues/1011)) ([8fa802d](https://github.com/DevExpress/devextreme-reactive/commit/8fa802d))
* **react-grid:** change default prop type ([#1056](https://github.com/DevExpress/devextreme-reactive/issues/1056)) ([34c44e8](https://github.com/DevExpress/devextreme-reactive/commit/34c44e8))
* **react-grid:** correct filtering predicate type ([#1062](https://github.com/DevExpress/devextreme-reactive/issues/1062)) ([b8367ee](https://github.com/DevExpress/devextreme-reactive/commit/b8367ee))
* **react-grid-material-ui:** reverse detail toggle icons ([#1044](https://github.com/DevExpress/devextreme-reactive/issues/1044)) ([06e7dcd](https://github.com/DevExpress/devextreme-reactive/commit/06e7dcd))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.2.0-beta.3...v1.2.0) (2018-05-04)


### Bug Fixes

* **react-grid:** correct Table.NoDataCell reference ([#903](https://github.com/DevExpress/devextreme-reactive/issues/903)) ([e3c8de2](https://github.com/DevExpress/devextreme-reactive/commit/e3c8de2))
* **react-grid:** correct TableFilterRow.CellProps types ([#926](https://github.com/DevExpress/devextreme-reactive/issues/926)) ([639f35f](https://github.com/DevExpress/devextreme-reactive/commit/639f35f))
* **react-grid:** correct types for components ([#910](https://github.com/DevExpress/devextreme-reactive/issues/910)) ([f5546b8](https://github.com/DevExpress/devextreme-reactive/commit/f5546b8))
* **react-grid:** do not pass the `row` property to the table edit command cell ([#890](https://github.com/DevExpress/devextreme-reactive/issues/890)) ([610343c](https://github.com/DevExpress/devextreme-reactive/commit/610343c))
* **react-grid-material-ui:** rename column chooser button component ([#871](https://github.com/DevExpress/devextreme-reactive/issues/871)) ([42ef0ab](https://github.com/DevExpress/devextreme-reactive/commit/42ef0ab))
* **react-grid-material-ui:** update material-ui to 1.0.0-beta.41 ([#901](https://github.com/DevExpress/devextreme-reactive/issues/901)) ([2447c4c](https://github.com/DevExpress/devextreme-reactive/commit/2447c4c))
* **react-grid:** fix incorrect prop types for CustomGrouping ([#946](https://github.com/DevExpress/devextreme-reactive/issues/946)) ([fdf492f](https://github.com/DevExpress/devextreme-reactive/commit/fdf492f)), closes [#941](https://github.com/DevExpress/devextreme-reactive/issues/941)
* **react-grid:** fix ts for TableColumnResizing ([#955](https://github.com/DevExpress/devextreme-reactive/issues/955)) ([d2cfcd6](https://github.com/DevExpress/devextreme-reactive/commit/d2cfcd6)), closes [#951](https://github.com/DevExpress/devextreme-reactive/issues/951)
* **react-grid-material-ui:** change detail toggle icon ([#957](https://github.com/DevExpress/devextreme-reactive/issues/957)) ([ce9b453](https://github.com/DevExpress/devextreme-reactive/commit/ce9b453))
* **react-grid-material-ui:** prevent click on disabled grouping control ([#935](https://github.com/DevExpress/devextreme-reactive/issues/935)) ([95fc44a](https://github.com/DevExpress/devextreme-reactive/commit/95fc44a))
* **react-grid:** fix the 'selectByRowClick' prop processing ([#1000](https://github.com/DevExpress/devextreme-reactive/issues/1000)) ([8dc1337](https://github.com/DevExpress/devextreme-reactive/commit/8dc1337)), closes [#998](https://github.com/DevExpress/devextreme-reactive/issues/998)
* **react-grid:** improve className and style types ([#930](https://github.com/DevExpress/devextreme-reactive/issues/930)) ([0132e12](https://github.com/DevExpress/devextreme-reactive/commit/0132e12))


### Features

* **react-grid:** allow word wrapping in table cells ([#875](https://github.com/DevExpress/devextreme-reactive/issues/875)) ([5febc85](https://github.com/DevExpress/devextreme-reactive/commit/5febc85))
* **react-grid:** support the Band Columns feature ([#826](https://github.com/DevExpress/devextreme-reactive/issues/826)) ([6f935a8](https://github.com/DevExpress/devextreme-reactive/commit/6f935a8))
* **react-grid:** support tree data structures ([#730](https://github.com/DevExpress/devextreme-reactive/issues/730)) ([d069c71](https://github.com/DevExpress/devextreme-reactive/commit/d069c71))
* **react-grid:** support column virtualization ([#892](https://github.com/DevExpress/devextreme-reactive/issues/892)) ([67dc486](https://github.com/DevExpress/devextreme-reactive/commit/67dc486))


### Performance Improvements

* **react-grid:** optimize column resizing ([#878](https://github.com/DevExpress/devextreme-reactive/issues/878)) ([b3f264b](https://github.com/DevExpress/devextreme-reactive/commit/b3f264b))



<a name="1.2.0-beta.3"></a>
# [1.2.0-beta.3](https://github.com/DevExpress/devextreme-reactive/compare/v1.2.0-beta.2...v1.2.0-beta.3) (2018-04-28)


### Bug Fixes

* **react-grid:** fix the 'selectByRowClick' prop processing ([#1000](https://github.com/DevExpress/devextreme-reactive/issues/1000)) ([8dc1337](https://github.com/DevExpress/devextreme-reactive/commit/8dc1337)), closes [#998](https://github.com/DevExpress/devextreme-reactive/issues/998)
* **react-grid:** improve className and style types ([#930](https://github.com/DevExpress/devextreme-reactive/issues/930)) ([0132e12](https://github.com/DevExpress/devextreme-reactive/commit/0132e12))



<a name="1.2.0-beta.2"></a>
# [1.2.0-beta.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.2.0-beta.1...v1.2.0-beta.2) (2018-04-19)


### Bug Fixes

* **react-grid:** fix incorrect prop types for CustomGrouping ([#946](https://github.com/DevExpress/devextreme-reactive/issues/946)) ([fdf492f](https://github.com/DevExpress/devextreme-reactive/commit/fdf492f)), closes [#941](https://github.com/DevExpress/devextreme-reactive/issues/941)
* **react-grid:** fix ts for TableColumnResizing ([#955](https://github.com/DevExpress/devextreme-reactive/issues/955)) ([d2cfcd6](https://github.com/DevExpress/devextreme-reactive/commit/d2cfcd6)), closes [#951](https://github.com/DevExpress/devextreme-reactive/issues/951)
* **react-grid-material-ui:** change detail toggle icon ([#957](https://github.com/DevExpress/devextreme-reactive/issues/957)) ([ce9b453](https://github.com/DevExpress/devextreme-reactive/commit/ce9b453))
* **react-grid-material-ui:** prevent click on disabled grouping control ([#935](https://github.com/DevExpress/devextreme-reactive/issues/935)) ([95fc44a](https://github.com/DevExpress/devextreme-reactive/commit/95fc44a))


### Features

* **react-grid:** support column virtualization ([#892](https://github.com/DevExpress/devextreme-reactive/issues/892)) ([67dc486](https://github.com/DevExpress/devextreme-reactive/commit/67dc486))



<a name="1.2.0-beta.1"></a>
# [1.2.0-beta.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.1.1...v1.2.0-beta.1) (2018-04-12)


### Bug Fixes

* **react-grid:** correct Table.NoDataCell reference ([#903](https://github.com/DevExpress/devextreme-reactive/issues/903)) ([e3c8de2](https://github.com/DevExpress/devextreme-reactive/commit/e3c8de2))
* **react-grid:** correct TableFilterRow.CellProps types ([#926](https://github.com/DevExpress/devextreme-reactive/issues/926)) ([639f35f](https://github.com/DevExpress/devextreme-reactive/commit/639f35f))
* **react-grid:** correct types for components ([#910](https://github.com/DevExpress/devextreme-reactive/issues/910)) ([f5546b8](https://github.com/DevExpress/devextreme-reactive/commit/f5546b8))
* **react-grid:** do not pass the `row` property to the table edit command cell ([#890](https://github.com/DevExpress/devextreme-reactive/issues/890)) ([610343c](https://github.com/DevExpress/devextreme-reactive/commit/610343c))
* **react-grid-material-ui:** rename column chooser button component ([#871](https://github.com/DevExpress/devextreme-reactive/issues/871)) ([42ef0ab](https://github.com/DevExpress/devextreme-reactive/commit/42ef0ab))
* **react-grid-material-ui:** update material-ui to 1.0.0-beta.41 ([#901](https://github.com/DevExpress/devextreme-reactive/issues/901)) ([2447c4c](https://github.com/DevExpress/devextreme-reactive/commit/2447c4c))


### Features

* **react-grid:** allow word wrapping in table cells ([#875](https://github.com/DevExpress/devextreme-reactive/issues/875)) ([5febc85](https://github.com/DevExpress/devextreme-reactive/commit/5febc85))
* **react-grid:** support the Band Columns feature ([#826](https://github.com/DevExpress/devextreme-reactive/issues/826)) ([6f935a8](https://github.com/DevExpress/devextreme-reactive/commit/6f935a8))
* **react-grid:** support tree data structures ([#730](https://github.com/DevExpress/devextreme-reactive/issues/730)) ([d069c71](https://github.com/DevExpress/devextreme-reactive/commit/d069c71))


### Performance Improvements

* **react-grid:** optimize column resizing ([#878](https://github.com/DevExpress/devextreme-reactive/issues/878)) ([b3f264b](https://github.com/DevExpress/devextreme-reactive/commit/b3f264b))



<a name="1.1.2"></a>
# [1.1.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.1.0...v1.1.2) (2018-04-11)


### Bug Fixes

* **react-grid:** correct Table.NoDataCell reference ([#899](https://github.com/DevExpress/devextreme-reactive/issues/899)) ([aaa2c4c](https://github.com/DevExpress/devextreme-reactive/commit/aaa2c4c))
* **react-grid:** correct types for components ([#902](https://github.com/DevExpress/devextreme-reactive/issues/902)) ([3666b7e](https://github.com/DevExpress/devextreme-reactive/commit/3666b7e))
* **react-grid-material-ui:** rename column chooser button component ([#872](https://github.com/DevExpress/devextreme-reactive/issues/872)) ([65b3a34](https://github.com/DevExpress/devextreme-reactive/commit/65b3a34))
* **react-grid-material-ui:** update material-ui to 1.0.0-beta.41 ([#900](https://github.com/DevExpress/devextreme-reactive/issues/900)) ([1715803](https://github.com/DevExpress/devextreme-reactive/commit/1715803))



<a name="1.1.1"></a>
# [1.1.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.1.0...v1.1.1) (2018-03-20)


### Bug Fixes

* **react-grid:** correct empty value passed to filter cell editors ([#857](https://github.com/DevExpress/devextreme-reactive/issues/857)) ([66e47d0](https://github.com/DevExpress/devextreme-reactive/commit/66e47d0))
* **react-grid:** correct TableHeaderRow.CellProps types ([#858](https://github.com/DevExpress/devextreme-reactive/issues/858)) ([8ed9b8a](https://github.com/DevExpress/devextreme-reactive/commit/8ed9b8a))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.1.0-beta.3...v1.1.0) (2018-03-15)


### Bug Fixes

* **grid-core:** repair column reordering after grouping ([#831](https://github.com/DevExpress/devextreme-reactive/issues/831)) ([edf32d0](https://github.com/DevExpress/devextreme-reactive/commit/edf32d0))
* **react-demos:** get rid of warnings in the Featured Controlled demos ([#821](https://github.com/DevExpress/devextreme-reactive/issues/821)) ([6c24a1b](https://github.com/DevExpress/devextreme-reactive/commit/6c24a1b))
* **react-grid:** cancel handling of bubbled scroll event in the virtual table ([#829](https://github.com/DevExpress/devextreme-reactive/issues/829)) ([8a9a731](https://github.com/DevExpress/devextreme-reactive/commit/8a9a731)), closes [#805](https://github.com/DevExpress/devextreme-reactive/issues/805)
* **react-grid-material-ui:** fix sorting in MUI v1.0.0-beta.37 ([#830](https://github.com/DevExpress/devextreme-reactive/issues/830)) ([47ba974](https://github.com/DevExpress/devextreme-reactive/commit/47ba974)), closes [#825](https://github.com/DevExpress/devextreme-reactive/issues/825)



<a name="1.1.0-beta.3"></a>
# [1.1.0-beta.3](https://github.com/DevExpress/devextreme-reactive/compare/v1.1.0-beta.2...v1.1.0-beta.3) (2018-03-07)


### Bug Fixes

* **react-grid-bootstrap4:** fix the 'Nothing to show' message ([#816](https://github.com/DevExpress/devextreme-reactive/issues/816)) ([34167bb](https://github.com/DevExpress/devextreme-reactive/commit/34167bb))
* **react-grid-bootstrap4:** get rid cursor poiner on disabled item ([#799](https://github.com/DevExpress/devextreme-reactive/issues/799)) ([1d59052](https://github.com/DevExpress/devextreme-reactive/commit/1d59052))


### Features

* **react-grid:** add search panel plugin ([#726](https://github.com/DevExpress/devextreme-reactive/issues/726)) ([c8e79fb](https://github.com/DevExpress/devextreme-reactive/commit/c8e79fb))
* **react-grid:** extract the Table plugin components ([#766](https://github.com/DevExpress/devextreme-reactive/issues/766)) ([e626a66](https://github.com/DevExpress/devextreme-reactive/commit/e626a66))
* **react-grid:** support center alignment for columns ([#804](https://github.com/DevExpress/devextreme-reactive/issues/804)) ([209d1c9](https://github.com/DevExpress/devextreme-reactive/commit/209d1c9))



<a name="1.1.0-beta.2"></a>
# [1.1.0-beta.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.1.0-beta.1...v1.1.0-beta.2) (2018-03-02)


### Bug Fixes

* **react-grid:** fix empty message styles ([#776](https://github.com/DevExpress/devextreme-reactive/issues/776)) ([f814360](https://github.com/DevExpress/devextreme-reactive/commit/f814360))


### Features

* **react-grid-bootstrap4:** support the bootstrap4 theme ([#681](https://github.com/DevExpress/devextreme-reactive/issues/681)) ([c3d58f0](https://github.com/DevExpress/devextreme-reactive/commit/c3d58f0))



<a name="1.0.3"></a>
# [1.0.3](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.2...v1.0.3) (2018-03-02)


### Bug Fixes

* **react-grid:** fix incorrect initial options handling ([#797](https://github.com/DevExpress/devextreme-reactive/issues/797)) ([1220664](https://github.com/DevExpress/devextreme-reactive/commit/1220664))
* **react-grid:** make EditingState pure ([#796](https://github.com/DevExpress/devextreme-reactive/issues/796)) ([b409c11](https://github.com/DevExpress/devextreme-reactive/commit/b409c11))



<a name="1.0.2"></a>
# [1.0.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.1...v1.0.2) (2018-03-01)

* **react-grid:** rework controlled mode ([#779](https://github.com/DevExpress/devextreme-reactive/issues/779)) ([a412dda](https://github.com/DevExpress/devextreme-reactive/commit/a412dda)), closes [#762](https://github.com/DevExpress/devextreme-reactive/issues/762)
* **react-grid-material-ui:** update material-ui and material-ui-icons version to 1.0.0-beta.35 ([#784](https://github.com/DevExpress/devextreme-reactive/issues/784)) ([d96b1be](https://github.com/DevExpress/devextreme-reactive/commit/d96b1be))



<a name="1.1.0-beta.1"></a>
# [1.1.0-beta.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0...v1.1.0-beta.1) (2018-02-22)


### Bug Fixes

* **react-grid:** allow adding custom styles to some components ([#728](https://github.com/DevExpress/devextreme-reactive/issues/728)) ([7580410](https://github.com/DevExpress/devextreme-reactive/commit/7580410))
* **react-grid:** fix reordering after grouping ([#744](https://github.com/DevExpress/devextreme-reactive/issues/744)) ([4de38d7](https://github.com/DevExpress/devextreme-reactive/commit/4de38d7))
* **react-grid-bootstrap3:** repair column chooser positioning ([#740](https://github.com/DevExpress/devextreme-reactive/issues/740)) ([4c4ed15](https://github.com/DevExpress/devextreme-reactive/commit/4c4ed15))
* **react-grid-material-ui:** remove PagingPanel's border-top ([#751](https://github.com/DevExpress/devextreme-reactive/issues/751)) ([353e486](https://github.com/DevExpress/devextreme-reactive/commit/353e486))


### Features

* **react-grid:** add the ability to prevent column filtering ([#702](https://github.com/DevExpress/devextreme-reactive/issues/702)) ([f3d3f10](https://github.com/DevExpress/devextreme-reactive/commit/f3d3f10))
* **react-grid:** add the ability to prevent column visibility toggling ([#705](https://github.com/DevExpress/devextreme-reactive/issues/705)) ([2cdfe06](https://github.com/DevExpress/devextreme-reactive/commit/2cdfe06))
* **react-grid:** add the ability to prevent editing by a column ([#729](https://github.com/DevExpress/devextreme-reactive/issues/729)) ([3c88c4c](https://github.com/DevExpress/devextreme-reactive/commit/3c88c4c))
* **react-grid:** add the ability to sort/group by the particular column ([#692](https://github.com/DevExpress/devextreme-reactive/issues/692)) ([b5d0e2f](https://github.com/DevExpress/devextreme-reactive/commit/b5d0e2f))
* **react-grid:** add TypeScript definitions ([#710](https://github.com/DevExpress/devextreme-reactive/issues/710)) ([7dfc052](https://github.com/DevExpress/devextreme-reactive/commit/7dfc052))



<a name="1.0.1"></a>
# [1.0.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0...v1.0.1) (2018-02-16)


### Bug Fixes

* **react-grid:** calculate visible rows when rendering VirtualTable ([#749](https://github.com/DevExpress/devextreme-reactive/issues/749)) ([424a48c](https://github.com/DevExpress/devextreme-reactive/commit/424a48c)), closes [#748](https://github.com/DevExpress/devextreme-reactive/issues/748)
* **react-grid:** fix hidden tall rows in VirtualTable ([#747](https://github.com/DevExpress/devextreme-reactive/issues/747)) ([dc02bd5](https://github.com/DevExpress/devextreme-reactive/commit/dc02bd5)), closes [#745](https://github.com/DevExpress/devextreme-reactive/issues/745)
* **react-grid-material-ui:** update material-ui version to 1.0.0-beta.33 ([#750](https://github.com/DevExpress/devextreme-reactive/issues/750)) ([4bf8810](https://github.com/DevExpress/devextreme-reactive/commit/4bf8810))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-rc.2...v1.0.0) (2018-02-02)


### Code Refactoring

* **react-core:** rename PluginContainer to Plugin ([#712](https://github.com/DevExpress/devextreme-reactive/issues/712)) ([30734d8](https://github.com/DevExpress/devextreme-reactive/commit/30734d8))
* **react-grid:** rename expanded details getter ([#713](https://github.com/DevExpress/devextreme-reactive/issues/713)) ([771eb3f](https://github.com/DevExpress/devextreme-reactive/commit/771eb3f))


### BREAKING CHANGES

* **react-core:** The `PluginContainer` component has been renamed to `Plugin`.
* **react-grid:** The `expandedRowIds` getter of the RowDetailState plugin has been renamed to `expandedDetailRowIds`.



<a name="1.0.0-rc.2"></a>
# [1.0.0-rc.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2018-01-26)


### Bug Fixes

* **react-core:** fix crash when using with webpack-dev-server and Hot Module Reloading ([#694](https://github.com/DevExpress/devextreme-reactive/issues/694)) ([bdc944b](https://github.com/DevExpress/devextreme-reactive/commit/bdc944b))
* **react-grid-bootstrap3:** align header and data cell texts ([#687](https://github.com/DevExpress/devextreme-reactive/issues/687)) ([b34f142](https://github.com/DevExpress/devextreme-reactive/commit/b34f142))
* **react-grid-bootstrap3:** correct grouping icon alignment ([#686](https://github.com/DevExpress/devextreme-reactive/issues/686)) ([fb30cc3](https://github.com/DevExpress/devextreme-reactive/commit/fb30cc3))
* **react-grid-material-ui:** use long paths for modules ([#684](https://github.com/DevExpress/devextreme-reactive/issues/684)) ([b32f79c](https://github.com/DevExpress/devextreme-reactive/commit/b32f79c))



<a name="1.0.0-rc.1"></a>
# [1.0.0-rc.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-beta.3...v1.0.0-rc.1) (2018-01-18)

### Bug Fixes

* **react-core:** clear text selection when dragging ([#669](https://github.com/DevExpress/devextreme-reactive/issues/669)) ([b7c2eac](https://github.com/DevExpress/devextreme-reactive/commit/b7c2eac))
* **react-grid:** display empty message when all data columns are hidden ([#670](https://github.com/DevExpress/devextreme-reactive/issues/670)) ([44d7622](https://github.com/DevExpress/devextreme-reactive/commit/44d7622))
* **react-grid:** set higher precedence to props in state plugins ([#663](https://github.com/DevExpress/devextreme-reactive/issues/663)) ([bb5ef97](https://github.com/DevExpress/devextreme-reactive/commit/bb5ef97)), closes [#662](https://github.com/DevExpress/devextreme-reactive/issues/662)
* **react-grid:** update render component in correct lifecycle hook ([#655](https://github.com/DevExpress/devextreme-reactive/issues/655)) ([c56ff88](https://github.com/DevExpress/devextreme-reactive/commit/c56ff88)), closes [#649](https://github.com/DevExpress/devextreme-reactive/issues/649)
* **react-grid-bootstrap3:** repair keyboard navigation in column chooser ([#666](https://github.com/DevExpress/devextreme-reactive/issues/666)) ([7f2b461](https://github.com/DevExpress/devextreme-reactive/commit/7f2b461))
* **react-grid-material-ui:** disable ripple on active page button ([#682](https://github.com/DevExpress/devextreme-reactive/issues/682)) ([c75078d](https://github.com/DevExpress/devextreme-reactive/commit/c75078d))
* **react-grid-material-ui:** import 'VisibilityOff' icon from separate file ([#640](https://github.com/DevExpress/devextreme-reactive/issues/640)) ([7b71ebc](https://github.com/DevExpress/devextreme-reactive/commit/7b71ebc))


### Code Refactoring

* **react-grid:** change columnWidth type from object to array ([#613](https://github.com/DevExpress/devextreme-reactive/issues/613)) ([6f4d19f](https://github.com/DevExpress/devextreme-reactive/commit/6f4d19f))
* **react-grid:** change the 'expandedGroups' Getter data type ([#661](https://github.com/DevExpress/devextreme-reactive/issues/661)) ([f078d3a](https://github.com/DevExpress/devextreme-reactive/commit/f078d3a))
* **react-grid:** change the 'selection' Getter data type ([#656](https://github.com/DevExpress/devextreme-reactive/issues/656)) ([262d169](https://github.com/DevExpress/devextreme-reactive/commit/262d169))
* **react-grid:** rename the *hiddenColumns getters and props ([#651](https://github.com/DevExpress/devextreme-reactive/issues/651)) ([068604d](https://github.com/DevExpress/devextreme-reactive/commit/068604d))
* **react-grid:** rename the changedRows Getter and dependent properties ([#657](https://github.com/DevExpress/devextreme-reactive/issues/657)) ([26735c7](https://github.com/DevExpress/devextreme-reactive/commit/26735c7))
* **react-grid:** rename the deletedRows Getter and dependent properties ([#652](https://github.com/DevExpress/devextreme-reactive/issues/652)) ([ae78d23](https://github.com/DevExpress/devextreme-reactive/commit/ae78d23))
* **react-grid:** rename the expandedRows Getter and dependent properties ([#653](https://github.com/DevExpress/devextreme-reactive/issues/653)) ([db56cad](https://github.com/DevExpress/devextreme-reactive/commit/db56cad))
* **react-grid:** rename the groupByColumn action to changeColumnGrouping ([#660](https://github.com/DevExpress/devextreme-reactive/issues/660)) ([a3974bd](https://github.com/DevExpress/devextreme-reactive/commit/a3974bd))
* **react-grid:** rename the setColumnFilter action to changeColumnFilter ([#659](https://github.com/DevExpress/devextreme-reactive/issues/659)) ([eec6c41](https://github.com/DevExpress/devextreme-reactive/commit/eec6c41))
* **react-grid:** rename the setColumnSorting action to changeColumnSorting ([#658](https://github.com/DevExpress/devextreme-reactive/issues/658)) ([e4f9c12](https://github.com/DevExpress/devextreme-reactive/commit/e4f9c12))
* **react-grid:** rename the setDetailRowExpanded action ([#648](https://github.com/DevExpress/devextreme-reactive/issues/648)) ([1285a14](https://github.com/DevExpress/devextreme-reactive/commit/1285a14))
* **react-grid:** standardize draft change actions in GroupingState ([#668](https://github.com/DevExpress/devextreme-reactive/issues/668)) ([43593eb](https://github.com/DevExpress/devextreme-reactive/commit/43593eb))
* **react-grid:** standardize draft change actions in TableColumnResizing ([#665](https://github.com/DevExpress/devextreme-reactive/issues/665)) ([3fec37a](https://github.com/DevExpress/devextreme-reactive/commit/3fec37a))
* **react-grid:** use the 'state' name as a parameter in toggle actions ([#645](https://github.com/DevExpress/devextreme-reactive/issues/645)) ([6c3f15d](https://github.com/DevExpress/devextreme-reactive/commit/6c3f15d))
* **react-grid:** rename the EditingState plugin properties ([#650](https://github.com/DevExpress/devextreme-reactive/issues/650)) ([4d7fe82](https://github.com/DevExpress/devextreme-reactive/commit/4d7fe82))

### BREAKING CHANGES

* **react-grid:** The `draftGrouping` getter does not contain information about draft mode anymore. The `draftGroupingChange`, and `cancelGroupingChange` actions have been renamed to `draftColumnGrouping`, and `cancelColumnGroupingDraft`.
* **react-grid:** The type of the TableColumnResizing plugin's `columnWidths` and `defaultColumnWidths` properties has been changed from object to array to improve API consistency.

  Before:

  ```js
  <Grid>
    <TableColumnResizing columnWidths={{ a: 120 }} />
  </Grid>
  ```

  After:

  ```js
  <Grid>
    <TableColumnResizing columnWidths={[{ columnName: a, width: 120 }]} />
  </Grid>
  ```
* **react-grid:** The `changeDraftTableColumnWidth` action has been renamed to `draftTableColumnWidth`. The functionality that resets draft column width has been moved from from the `draftTableColumnWidth` action into the separate `cancelTableColumnWidthDraft` action.

  The `onDraftWidthChange` event of the TableHeaderRow's cellComponent has been renamed to `onWidthDraft`. The functionality that cancels draft width changes has been extracted to the `onWidthDraftCancel` event.
* **react-grid:** The the GroupingState plugin's `groupByColumn` action has been renamed to `changeColumnGrouping`.
* **react-grid:** We changed the `selection` getter's data type from `Set` to `Array` to improve the API consistency.
* **react-grid:** We renamed the following TableColumnVisibility plugin's properties to improve the API consistency:

  * `hiddenColumns` => `hiddenColumnNames`
  * `defaultHiddenColumns` => `defaultHiddenColumnNames`
  * `onHiddenColumnsChange` => `onHiddenColumnNamesChange`

  The `hiddenColumns` getter has been renamed to `hiddenColumnNames`.
* **react-grid:** The following RowDetailState plugin's properties have been renamed to improve the API consistency:

  * `expandedRows` => `expandedRowIds`
  * `defaultExpandedRows` => `defaultExpandedRowIds`
  * `onExpandedRowsChange` => `onExpandedRowIdsChange`

  The `expandedRows` getter has been renamed to `expandedRowIds`.
* **react-grid:** The following EditingState plugin's properties have been renamed to improve the API consistency:

  * `changedRows` => `rowChanges`
  * `defaultChangedRows` => `defaultRowChanges`
  * `onChangedRowsChange` => `onRowChangesChange`

  The `changedRows` getter has been renamed to `rowChanges`.
* **react-grid:** The FilteringState plugin's `setColumnFilter` action has been renamed to `changeColumnFilter`.
* **react-grid:** The RowDetailState plugin's `setDetailRowExpanded` action has been renamed to `toggleDetailRowExpanded`.
* **react-grid:** The `toggleSelection` action's `selected` parameter has been renamed to `state`.
* **react-grid:** We changed the `expandedGroups` getter's data type from `Set` to `Array` to improve the API consistency.
* **react-grid:** The following EditingState plugin's properties have been renamed to improve the API consistency:

  * `deletedRows` => `deletedRowIds`
  * `defaultDeletedRows` => `defaultDeletedRowIds`
  * `onDeletedRowsChange` => `onDeletedRowIdsChange`
  * `editingRows` => `editingRowIds`
  * `defaultEditingRows` => `defaultEditingRowIds`
  * `onEditingRowsChange` => `onEditingRowIdsChange`

  The `deletedRows` getter has been renamed to `deletedRowIds`.
  The `editingRows` getter has been renamed to `editingRowIds`.
* **react-grid:** The SortingState plugin's `setColumnSorting` action has been renamed to `changeColumnSorting`.



<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2017-12-28)


### Bug Fixes

* **grid-core:** fix blinks when reordering group items ([#573](https://github.com/DevExpress/devextreme-reactive/issues/573)) ([739c664](https://github.com/DevExpress/devextreme-reactive/commit/739c664))
* **react-grid:** correct state helper & editing state ([#623](https://github.com/DevExpress/devextreme-reactive/issues/623)) ([3cd07bd](https://github.com/DevExpress/devextreme-reactive/commit/3cd07bd))
* **react-grid:** fix blinks when reordering header-cell items ([#590](https://github.com/DevExpress/devextreme-reactive/issues/590)) ([e94b824](https://github.com/DevExpress/devextreme-reactive/commit/e94b824))
* **react-grid:** fix incorrect applying of several actions in a batch ([#560](https://github.com/DevExpress/devextreme-reactive/issues/560)) ([7c3ff9b](https://github.com/DevExpress/devextreme-reactive/commit/7c3ff9b)), closes [#549](https://github.com/DevExpress/devextreme-reactive/issues/549)
* **react-grid:** remove outline from header cell when mouse click ([#576](https://github.com/DevExpress/devextreme-reactive/issues/576)) ([807597b](https://github.com/DevExpress/devextreme-reactive/commit/807597b))
* **react-grid-material-ui:** add border beetwin rows and pager panel ([#622](https://github.com/DevExpress/devextreme-reactive/issues/622)) ([d7cb9c7](https://github.com/DevExpress/devextreme-reactive/commit/d7cb9c7))
* **react-grid-material-ui:** use theme constant in the table header background ([#602](https://github.com/DevExpress/devextreme-reactive/issues/602)) ([797e134](https://github.com/DevExpress/devextreme-reactive/commit/797e134))


### Code Refactoring

* **react-grid:** add the toolbar ([#585](https://github.com/DevExpress/devextreme-reactive/issues/585)) ([70fdc25](https://github.com/DevExpress/devextreme-reactive/commit/70fdc25))
* **react-grid:** cancel column sorting by passing null to the direction argument ([#620](https://github.com/DevExpress/devextreme-reactive/issues/620)) ([3abe8f9](https://github.com/DevExpress/devextreme-reactive/commit/3abe8f9))
* **react-grid:** extract table column extension ([#586](https://github.com/DevExpress/devextreme-reactive/issues/586)) ([7f57be2](https://github.com/DevExpress/devextreme-reactive/commit/7f57be2))
* **react-grid:** get rid of explicit column resizing enabling ([#597](https://github.com/DevExpress/devextreme-reactive/issues/597)) ([f215103](https://github.com/DevExpress/devextreme-reactive/commit/f215103))
* **react-grid:** get rid of explicit dragging enabling ([#583](https://github.com/DevExpress/devextreme-reactive/issues/583)) ([60797c2](https://github.com/DevExpress/devextreme-reactive/commit/60797c2))
* **react-grid:** give column properties greater precedence ([#617](https://github.com/DevExpress/devextreme-reactive/issues/617)) ([4a2924c](https://github.com/DevExpress/devextreme-reactive/commit/4a2924c))
* **react-grid:** remove totalCount property from PagingState to CustomPaging ([#555](https://github.com/DevExpress/devextreme-reactive/issues/555)) ([95fe97d](https://github.com/DevExpress/devextreme-reactive/commit/95fe97d))
* **react-grid:** rename data processing plugins ([#612](https://github.com/DevExpress/devextreme-reactive/issues/612)) ([468dde4](https://github.com/DevExpress/devextreme-reactive/commit/468dde4))
* **react-grid:** rename DragDropContext to DragDropProvider ([#611](https://github.com/DevExpress/devextreme-reactive/issues/611)) ([26d303e](https://github.com/DevExpress/devextreme-reactive/commit/26d303e))
* **react-grid:** rename properties from allow* to *Enabled ([#618](https://github.com/DevExpress/devextreme-reactive/issues/618)) ([6c291e8](https://github.com/DevExpress/devextreme-reactive/commit/6c291e8))
* **react-grid:** rename some group and paging properties ([#581](https://github.com/DevExpress/devextreme-reactive/issues/581)) ([6300249](https://github.com/DevExpress/devextreme-reactive/commit/6300249))
* **react-grid:** specify typed columns directly in DataTypeProvider ([#591](https://github.com/DevExpress/devextreme-reactive/issues/591)) ([6ed28e4](https://github.com/DevExpress/devextreme-reactive/commit/6ed28e4))
* **react-grid:** swap args in the createRowChange function ([#619](https://github.com/DevExpress/devextreme-reactive/issues/619)) ([1178ee1](https://github.com/DevExpress/devextreme-reactive/commit/1178ee1))
* **react-grid:** switch to column extensions in EditingState ([#604](https://github.com/DevExpress/devextreme-reactive/issues/604)) ([d56b3f0](https://github.com/DevExpress/devextreme-reactive/commit/d56b3f0))
* **react-grid:** switch to column extensions in LocalFiltering ([#594](https://github.com/DevExpress/devextreme-reactive/issues/594)) ([955da48](https://github.com/DevExpress/devextreme-reactive/commit/955da48))
* **react-grid:** switch to column extensions in LocalGrouping ([#601](https://github.com/DevExpress/devextreme-reactive/issues/601)) ([9efc007](https://github.com/DevExpress/devextreme-reactive/commit/9efc007))
* **react-grid:** switch to column extensions in LocalSorting ([#603](https://github.com/DevExpress/devextreme-reactive/issues/603)) ([08c96da](https://github.com/DevExpress/devextreme-reactive/commit/08c96da))
* **react-grid:** switch to column extensions in TableGroupRow ([#609](https://github.com/DevExpress/devextreme-reactive/issues/609)) ([373d4d8](https://github.com/DevExpress/devextreme-reactive/commit/373d4d8))


### Features

* **react-grid:** add the ColumnChooser plugin ([#607](https://github.com/DevExpress/devextreme-reactive/issues/607)) ([16eb588](https://github.com/DevExpress/devextreme-reactive/commit/16eb588))


### BREAKING CHANGES

* **react-grid:** We have moved the PagingState plugin's `totalCount` property to the CustomPaging plugin to improve API consistency. Now, you can add the CustomPaging plugin to a project and specify its `totalCount` property to implement remote paging.

  Before:

  ```js
  <Grid>
    <...>
    <PagingState totalCount={10} />
  </Grid>
  ```

  After:

  ```js
  <Grid>
    <...>
    <PagingState />
    <CustomPaging totalCount={10} />
  </Grid>
  ```
* **react-grid:** To simplify working and make consistent API, some plugins properties have been renamed.
  - The TableHeaderRow plugin's `allowGroupingByClick` property has been renamed to `showGroupingControls`.
  - The GroupingPanel plugin's `allowUngroupingByClick` property has been renamed to `showGroupingControls`.
  - The PagingPanel plugin's `allowedPageSizes` property has been renamed to `pageSizes `.
* **react-grid:** A column's `getCellValue` function has gotten higher priority than that defined in the Grid component.
* **react-grid:** The `createRowChange` function arguments order has been changed to `(row: any, value: any, columnName: string)` to improve the API consistency. Now, the EditingState plugin's `createRowChange` function has the same signature as the column extension's one.
* **react-grid:** We have renamed the following plugins that process data to make the Grid API more consistent:

  - LocalFiltering => IntegratedFiltering
  - LocalGrouping => IntegratedGrouping
  - LocalPaging => IntegratedPaging
  - LocalSelection => IntegratedSelection
  - LocalSorting => IntegratedSorting
* **react-grid:** We removed the LocalSorting plugin's `getColumnIdentity` property to improve API consistency. Now, use the column extension's `criteria` property to specify an individual column's grouping criteria.

  Before:

  ```js
  const columns = [{ name: 'field' }, { name: 'field2' }];
  const fieldGroupCriteria = /* custom group criteria */;
  const getColumnIdentity = (columnName) => {
    if (name === 'field') return fieldGroupCriteria;
  };

  <Grid columns={columns}>
    <LocalGrouping getColumnIdentity={getColumnIdentity} />
  </Grid>
  ```

  After:

  ```js
  const columns= [{ name: 'field' }, { name: 'field2' }];
  const fieldGroupCriteria = /* custom group criteria */;
  const integratedGroupingColumnExtensions = [
    { columnName: 'field', criteria: fieldGroupCriteria },
  ];

  <Grid columns={columns}>
    <IntegratedGrouping columnExtensions={integratedGroupingColumnExtensions} />
  </Grid>
  ```
* **react-grid:** We removed the `cancel` argument from the SortingState plugin's `setColumnSorting` action and from the `onSort` event of the TableHeaderCellProps and GroupPanelItemProps component properties. Now, you can pass `null` to the `direction` argument to cancel sorting by column.
* **react-grid:** The TableHeaderCellProps interface's `allowResizing` property has been renamed to `resizingEnabled` to improve the API consistency.
* **react-grid:** We removed the `getColumnCompare` property from the LocalSorting plugin to improve API consistency. Now, use the `columnExtension` property to specify individual column sorting options.

  Before:

  ```js
  const columns = [{ name: 'field' }, { name: 'field2' }];
  const fieldCompare = /* custom sort compare */;
  const getColumnCompare = (columnName) => {
    if (name === 'field') return fieldCompare;
  };

  <Grid columns={columns}>
    <LocalSorting getColumnCompare={getColumnCompare} />
  </Grid>
  ```

  After:

  ```js
  const columns= [{ name: 'field' }, { name: 'field2' }];
  const fieldCompare = /* custom sort compare */;
  const integratedSortingColumnExtensions = [
    { columnName: 'field', compare: fieldIdentity },
  ];

  <Grid columns={columns}>
    <IntegratedSorting columnExtensions={integratedSortingColumnExtensions} />
  </Grid>
  ```
* **react-grid:** We have integrated the column chooser into the Grid as a plugin to simplify the API. Now, use the column chooser as follows:

  ```js
  <Grid>
    {/* ... */}
    <TableColumnVisibility
      /* props */
    />
    <Toolbar />
    <ColumnChooser />
  </Grid>
  ```

  For details, see [Controlling Column Visibility](https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/column-visibility/).
* **react-grid:** We extracted the column's `showWhenGrouped` property that the TableGroupRow plugin handles to a column extension to improve the API readability.
  The TableGroupRow plugin's `showColumnsWhenGrouped` property type has been changed to `boolean` and this property affects all columns. If you need to control specific columns' visibility, use column extensions.

  Before:

  ```js
  const columns = [{ name: 'field', showWhenGrouped: true }, { name: 'field2' }];

  <Grid columns={columns}>
    <TableGroupRow />
  </Grid>
  ```

  After:

  ```js
  const columns= [{ name: 'field' }, { name: 'field2' }];
  const tableGroupColumnExtensions = [
    { columnName: 'field', showWhenGrouped: true },
  ];

  <Grid columns={columns}>
    <TableGroupRow columnExtensions={tableGroupColumnExtensions} />
  </Grid>
  ```

  Note that column extension properties have higher priority than corresponding plugin properties.
* **react-grid:** We renamed the `DragDropContext` plugin to `DragDropProvider` to improve API consistency.
* **react-grid:** We removed the `allowResizing` property from the TableHeaderRow plugin to simplify the API. Now, adding the TableColumnResizing plugin enables column resizing.
* **react-grid:** In order to improve API readability, we extracted the `width` and `align` column properties that the Table and VirtualTable plugins handle into a separate property. Now, the `width` and `align` properties in the Grid `columns` are no longer supported. Use a TableColumnExtension instead:

  Before:

  ```js
  const columns= [{ name: 'field', width: 100 }, { name: 'field2' }];

  <Grid columns={columns}>
    <Table />
  </Grid>
  ```

  After:

  ```js
  const columns= [{ name: 'field1' }, { name: 'field2' }];
  const tableColumnExtensions = [{ columnName: 'field1', width: 100 }];

  <Grid columns={columns}>
    <Table columnExtensions={tableColumnExtensions} />
  </Grid>
  ```
* **react-grid:** In order to simplify API, we changed the way the DataTypeProvider plugin detects columns associated with a type. Now, to associate a custom formatter and editor with a column, pass a column array to the DataTypeProvider's `for` field:

  Before:

  ```js
  const columns= [{ name: 'field', dataType: 'boolean' }, { name: 'field2' }];

  <Grid columns={columns}>
    <DataTypeProvider type="boolean" />
  </Grid>
  ```

  After:

  ```js
  const columns= [{ name: 'field1' }, { name: 'field2' }];
  const booleanColumns = ['field1'];

  <Grid columns={columns}>
    <DataTypeProvider for={booleanColumns} />
  </Grid>
  ```
* **react-grid:** In order to improve API consistency, we've decided to replace the `getColumnPredicate` function in the LocalFiltering plugin with the LocalFilteringColumnExtension.

  Before:

  ```js
  const columns = [{ name: 'field' }, { name: 'field2' }];
  const fieldPredicate = /* custom filtering predicate */;
  const getColumnPredicate = (columnName) => {
    if (name === 'field') return fieldPredicate;
  };

  <Grid columns={columns}>
    <LocalFiltering getColumnPredicate={getColumnPredicate} />
  </Grid>
  ```

  After:

  ```js
  const columns= [{ name: 'field' }, { name: 'field2' }];
  const fieldPredicate = /* custom filtering predicate */;
  const integratedFilteringColumnExtensions = [
    { columnName: 'field', predicate: fieldPredicate },
  ];

  <Grid columns={columns}>
    <IntegratedFiltering columnExtensions={integratedFilteringColumnExtensions} />
  </Grid>
  ```
* **react-grid:** In order to simplify API, we've decided to remove allowDragging properties in TableHeaderRow and GroupingPanel plugins. Now, to enable dragging it is enough to add the DragDropContext plugin.
* **react-grid:**  
To provide a more convenient and flexible way to render elements that are placed within a Grid header we add the Toolbar plugin. For this reason, the GroupingPanel plugin has the Toolbar dependency:
 
  ```js
  import {
    // ...
    Toolbar,
    GroupingPanel
  } from '@devexpress/dx-react-grid-material-ui';

  <Grid>
    {/* ... */}
    <Toolbar />
    <GroupingPanel />
  </Grid>
  ```
   
  To simplify Grid's markup we removed header placeholder and footer placeholder components.
  If you're customizing Grid appearance using the `headerPlaceholderComponent` and `footerPlaceholderComponent` properties, your code should be updated as follows:
   
  Before:

  ```js
  <Grid
    headerPlaceholderTemplate={() => (<div />)}
    footerPlaceholderTemplate={() => (<div />)}
  >
  {/* ... */}
  </Grid>
  ```

  After:

  ```js
  import { Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

  <Grid>
    <Template name="header">
      <TemplatePlaceholder />
      {/* Custom markup */}
    </Template>
    <Template name="footer">
      <TemplatePlaceholder />
      {/* Custom markup */}
    </Template>
    {/* ... */}
  </Grid>
  ```
* **react-grid:** We extracted the column's `createRowChange` property that the EditingState plugin handles to a column extension to improve API readability.

  Before:

  ```js
  const columns = [{ name: 'field', createRowChange: (row, value) => { /* logic */ } }, { name: 'field2' }];

  <Grid columns={columns}>
    <EditingState />
  </Grid>
  ```

  After:

  ```js
  const columns= [{ name: 'field' }, { name: 'field2' }];
  const editingColumnExtensions = [
    { columnName: 'field', createRowChange: (row, value) => { /* logic */ } },
  ];

  <Grid columns={columns}>
    <EditingState columnExtensions={editingColumnExtensions} />
  </Grid>
  ```

  Note that column extension properties have higher priority than corresponding plugin properties.



<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2017-12-14)

### Bug Fixes

* **grid-core:** allow to place TableColumnVisibility after another table plugins ([#557](https://github.com/DevExpress/devextreme-reactive/issues/557)) ([6788ba6](https://github.com/DevExpress/devextreme-reactive/commit/6788ba6))
* **grid-core:** fix problem when grouped columns are hidden ([#562](https://github.com/DevExpress/devextreme-reactive/issues/562)) ([8fbc2c9](https://github.com/DevExpress/devextreme-reactive/commit/8fbc2c9))
* **react-core:** fix drag by mouse on a touch-enabled devices ([#541](https://github.com/DevExpress/devextreme-reactive/issues/541)) ([fd9b7f9](https://github.com/DevExpress/devextreme-reactive/commit/fd9b7f9)), closes [#535](https://github.com/DevExpress/devextreme-reactive/issues/535)
* **react-core:** remove redundant markup elements ([#544](https://github.com/DevExpress/devextreme-reactive/issues/544)) ([f5e24a6](https://github.com/DevExpress/devextreme-reactive/commit/f5e24a6))
* **react-demos:** fix the Featured Remote Data demo ([#548](https://github.com/DevExpress/devextreme-reactive/issues/548)) ([35729d1](https://github.com/DevExpress/devextreme-reactive/commit/35729d1))
* **react-grid:** clean drag-drop grouping variables ([#479](https://github.com/DevExpress/devextreme-reactive/issues/479)) ([fdfab56](https://github.com/DevExpress/devextreme-reactive/commit/fdfab56))
* **react-grid:** get rid of console error during column dragging ([#570](https://github.com/DevExpress/devextreme-reactive/issues/570)) ([c508953](https://github.com/DevExpress/devextreme-reactive/commit/c508953))
* **react-grid:** prevent click event propagation on detail toggle ([#494](https://github.com/DevExpress/devextreme-reactive/issues/494)) ([f5b861b](https://github.com/DevExpress/devextreme-reactive/commit/f5b861b)), closes [#492](https://github.com/DevExpress/devextreme-reactive/issues/492)
* **react-grid-material-ui:** correct header cell width ([#536](https://github.com/DevExpress/devextreme-reactive/issues/536)) ([858ee1c](https://github.com/DevExpress/devextreme-reactive/commit/858ee1c))
* **react-grid-material-ui:** replace click action from Cell to CheckBox ([#490](https://github.com/DevExpress/devextreme-reactive/issues/490)) ([8a12806](https://github.com/DevExpress/devextreme-reactive/commit/8a12806))
* **react-grid-material-ui:** rework cell paddings ([#480](https://github.com/DevExpress/devextreme-reactive/issues/480)) ([1bc29f2](https://github.com/DevExpress/devextreme-reactive/commit/1bc29f2))


### Code Refactoring

*  **react-grid:** replace render functions with components in TableEditRow (#518) ([9bc0993](https://github.com/DevExpress/devextreme-reactive/commit/9bc0993))
*  **react-grid:** replace render functions with components in TableEditColumn (#522) ([9273e04](https://github.com/DevExpress/devextreme-reactive/commit/9273e04))
*  **react-grid:** replace render functions with components in TableFilterRow (#512) ([1b95ae5](https://github.com/DevExpress/devextreme-reactive/commit/1b95ae5))
* **react-grid:** replace Watcher with the Getter ([#545](https://github.com/DevExpress/devextreme-reactive/issues/545)) ([138c7c0](https://github.com/DevExpress/devextreme-reactive/commit/138c7c0))
* **react-grid:** get rid of internal seamless-immutable support ([#556](https://github.com/DevExpress/devextreme-reactive/issues/556)) ([195ad79](https://github.com/DevExpress/devextreme-reactive/commit/195ad79))
* **react-grid:** rename TableView and VirtualTableView components to Table and VirtualTable ([#482](https://github.com/DevExpress/devextreme-reactive/issues/482)) ([3874da9](https://github.com/DevExpress/devextreme-reactive/commit/3874da9))
* **react-grid:** replace render functions with components in Grid ([#486](https://github.com/DevExpress/devextreme-reactive/issues/486)) ([cb409a1](https://github.com/DevExpress/devextreme-reactive/commit/cb409a1))
* **react-grid:** replace render functions with components in GroupingPanel ([#540](https://github.com/DevExpress/devextreme-reactive/issues/540)) ([fbca230](https://github.com/DevExpress/devextreme-reactive/commit/fbca230))
* **react-grid:** replace render functions with components in TableGroupRow ([#511](https://github.com/DevExpress/devextreme-reactive/issues/511)) ([7d7d3a1](https://github.com/DevExpress/devextreme-reactive/commit/7d7d3a1))
* **react-grid:** replace render functions with components in TableHeaderRow ([#508](https://github.com/DevExpress/devextreme-reactive/issues/508)) ([255e729](https://github.com/DevExpress/devextreme-reactive/commit/255e729))
* **react-grid:** replace render functions with components in TableRowDetail ([#505](https://github.com/DevExpress/devextreme-reactive/issues/505)) ([844330b](https://github.com/DevExpress/devextreme-reactive/commit/844330b))
* **react-grid:** replace render functions with components in TableSelection ([#502](https://github.com/DevExpress/devextreme-reactive/issues/502)) ([f9e3c88](https://github.com/DevExpress/devextreme-reactive/commit/f9e3c88))
* **react-grid:** replace render functions with components in TableView ([#485](https://github.com/DevExpress/devextreme-reactive/issues/485)) ([f5bd4e0](https://github.com/DevExpress/devextreme-reactive/commit/f5bd4e0))
* **react-grid:** split SelectionState to SelectionState and LocalSelection ([#506](https://github.com/DevExpress/devextreme-reactive/issues/506)) ([e49ad0d](https://github.com/DevExpress/devextreme-reactive/commit/e49ad0d))
* **react-grid:** split SelectionState to SelectionState and LocalSelection ([#552](https://github.com/DevExpress/devextreme-reactive/issues/552)) ([be42695](https://github.com/DevExpress/devextreme-reactive/commit/be42695))
* **react-grid-material-ui:** get rid of the Paper wrapper ([#487](https://github.com/DevExpress/devextreme-reactive/issues/487)) ([2e40de9](https://github.com/DevExpress/devextreme-reactive/commit/2e40de9))


### Features

* **react-grid:** add components for ColumnChooser ([#543](https://github.com/DevExpress/devextreme-reactive/issues/543)) ([7c24c91](https://github.com/DevExpress/devextreme-reactive/commit/7c24c91))
* **react-grid:** add components for DragDropContext plugin ([#526](https://github.com/DevExpress/devextreme-reactive/issues/526)) ([49d9662](https://github.com/DevExpress/devextreme-reactive/commit/49d9662))
* **react-grid:** add components for the Grid component ([#553](https://github.com/DevExpress/devextreme-reactive/issues/553)) ([314f0d8](https://github.com/DevExpress/devextreme-reactive/commit/314f0d8))
* **react-grid:** add components for the GroupingPanel plugin ([#565](https://github.com/DevExpress/devextreme-reactive/issues/565)) ([e79ba9c](https://github.com/DevExpress/devextreme-reactive/commit/e79ba9c))
* **react-grid:** add components for the PagingPanel plugin ([#542](https://github.com/DevExpress/devextreme-reactive/issues/542)) ([3d226bb](https://github.com/DevExpress/devextreme-reactive/commit/3d226bb))
* **react-grid:** add components for the Table plugin ([#516](https://github.com/DevExpress/devextreme-reactive/issues/516)) ([37b4393](https://github.com/DevExpress/devextreme-reactive/commit/37b4393))
* **react-grid:** add components for the TableColumnVisibility plugin ([#539](https://github.com/DevExpress/devextreme-reactive/issues/539)) ([2d12091](https://github.com/DevExpress/devextreme-reactive/commit/2d12091))
* **react-grid:** add components for the TableEditColumn plugin ([#534](https://github.com/DevExpress/devextreme-reactive/issues/534)) ([a24a9ce](https://github.com/DevExpress/devextreme-reactive/commit/a24a9ce))
* **react-grid:** add components for the TableEditRow plugin ([#529](https://github.com/DevExpress/devextreme-reactive/issues/529)) ([5615ecf](https://github.com/DevExpress/devextreme-reactive/commit/5615ecf))
* **react-grid:** add components for the TableFilterRow plugin ([#523](https://github.com/DevExpress/devextreme-reactive/issues/523)) ([06afae1](https://github.com/DevExpress/devextreme-reactive/commit/06afae1))
* **react-grid:** add components for the TableGroupRow plugin ([#520](https://github.com/DevExpress/devextreme-reactive/issues/520)) ([dc9903c](https://github.com/DevExpress/devextreme-reactive/commit/dc9903c))
* **react-grid:** add components for the TableRowDetail plugin ([#538](https://github.com/DevExpress/devextreme-reactive/issues/538)) ([a721d36](https://github.com/DevExpress/devextreme-reactive/commit/a721d36))
* **react-grid:** add components for the TableSelection plugin ([#521](https://github.com/DevExpress/devextreme-reactive/issues/521)) ([4574aaf](https://github.com/DevExpress/devextreme-reactive/commit/4574aaf))
* **react-grid:** add components for the VirtualTable plugin ([#566](https://github.com/DevExpress/devextreme-reactive/issues/566)) ([d67ec6f](https://github.com/DevExpress/devextreme-reactive/commit/d67ec6f))
* **react-grid:** add table header row & cell components ([#507](https://github.com/DevExpress/devextreme-reactive/issues/507)) ([826cda8](https://github.com/DevExpress/devextreme-reactive/commit/826cda8))

### BREAKING CHANGES

* **react-core:** To get rid of redundant 'div' elements in markup, we have updated the minimum React version the grid requires to 16.2.0.
* **react-grid:** Some times ago, we created a [pull request](https://github.com/DevExpress/devextreme-reactive/pull/179) that allows using our React Grid with the [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) library. The main change is that we switched from the `Array.prototype.slice()` function to the `Array.from()` one to copy arrays. It was not a good decision, because `Array.from()` is [slower](https://jsperf.com/array-from-vs-array-slice) than `Array.prototype.slice()`. Now we return back to `Array.prototype.slice()` for performance reasons.

  If you are using the seamless-immutable library, change your code as follows:

  ```js
  const state = {
    data: Immutable({
      selection: [],
    })
  };

  <Grid>
    { /* ...*/ }
    <SelectionState
      // selection: this.state.data.selection -> before
      selection: this.state.data.selection.asMutable() // now
    />
  </Grid>
  ```
  The related [guide](https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/immutable-data/) is updated as well.
* **react-grid-material-ui:** To make Grid for Material-UI more flexible we've stopped using the [Paper](https://material-ui.com/demos/paper/) component inside the Grid's layout.
 
It allows placing our Grid to an existing Paper with other components. For example:

  ```js
  <Paper>
    <Button>Products</Button>
    <Button>Customers</Button>
    <Button>Sales</Button>
    <Grid
      /* ... */
    >
      {/* ... */}
    </Grid>
  </Paper>
  ```

* **react-grid:** To simplify working with selection features and make the selection plugin's purposes clearer, the functionality that computes the selection state has been moved from the `SelectionState` plugin to the `LocalSelection` one:
  * The `availableToSelect` getter has been deleted from the `SelectionState` plugin, while the `selectAllAvailable`, `allSelected`, and `someSelected` getters have been added to the `LocalSelection` plugin.
  * The `SelectionState` plugin's `setRowsSelection` action has been renamed to `toggleSelection`.
  * The `selection` getter's return value type has been changed to `Set`.
  * The default value of the `TableSelection` plugin's `showSelectAll` property has been changed to `false`.

  Both plugins are available from the `@devexpress/dx-react-grid` package.
  Note that `LocalSelection` should be linked after `SelectionState` if you use the `TableSelection` plugin.
* **react-core:** To simplify working with plugins, we have got rid of the Watcher.
Now, you can use a Getter instead.

  Before:
  ```
  ...
  <Watcher
    watch={
      getter = getter('someGetter')
    }
    onChange={(action, someGetter) => {
      action('someAction')(someGetter);
    }}
  />
  ...
  ```

  After:
  ```
  ...
  <Getter
    name="someGetter"
    computed={(getters, actions) => {
        actions.someAction(getters.someGetter);
      return getters.someGetter;
    }}
  />
  ...
  ```

* **react-grid:** Such plugin names as `TableView` and `VirtualTableView` don't correspond to other plugins like `TableFilterRow`, `TableGroupRow`, `TableSelection`, which do not have "view" in their names. To keep the names of plugins consistent, the following changes have been introduced:

  * the `TableView` plugin has been renamed to `Table`;
  * the `VirtualTableView` plugin has been renamed to `VirtualTable`;

* **react-grid:** The TableEditRow plugin's `editCellTemplate`, and `editRowTemplate` properties have been replaced with `cellComponent`, and `rowComponent` ones, which accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)
* **react-grid:** The GroupingPanel plugin's `groupPanelTemplate`, and `groupPanelItemTemplate` properties have been replaced with  `containerComponent`, and `itemComponent` ones, which accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)

  `containerComponent` takes on the `children` property instead of all arguments passed to the `groupPanelTemplate` function.

  The `onSort`, and `onGroup` properties passed to `itemComponent` are used instead of the `changeSortingDirection`, and `groupByColumn` arguments passed to the `groupPanelItemTemplate` function. The `item`, and `draft` properties are no longer available, use the `item` property instead.
* **react-grid:** The TableEditColumn plugin's `commandTemplate`, `cellTemplate` and `headingCellTemplate` properties have been replaced with `commandComponent`, `cellComponent`, and `headerCellComponent` ones, which accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)

  Properties passed to a component returned from `commandComponent` have the same names as arguments passed to the `commandTemplate` function with the following exception. The `onExecute` property is used instead of the `executeCommand` argument.

  All properties passed to the `cellComponent` except `row` have been replaced by the `children` property providing configured commands.

  All properties passed to the `headingCellComponent` have been replaced by the `children` property providing configured commands.
* **react-grid:** The TableGroupRow plugin's `groupIndentColumnWidth` property has been renamed to `indentColumnWidth`. The `groupCellTemplate`, `groupRowTemplate` and `groupIndentCellTemplate` properties have been replaced with `cellComponent`, `rowComponent`, and `indentCellComponent` ones, which accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)

  Properties passed to `cellComponent` have the same names as arguments passed to the `groupCellTemplate` function with the following exceptions:
  * The `onToggle` property is used instead of the `toggleGroupExpanded` argument.
  * The `expanded` property is used instead of the `isExpanded` argument.
* **react-grid:** The TableFilterRow plugin's `filterCellTemplate` and `filterRowTemplate` properties have been replaced with `cellComponent`, and `rowComponent` ones, which accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)

  Properties passed to `cellComponent` have the same names as arguments passed to the `filterCellTemplate` function except for the `onFilter` property, which is used instead of the `setFilter` argument.
* **react-grid:** The TableHeaderRow's `headerCellTemplate`, and `headerRowTemplate` properties have been replaced with `cellComponent`, and `rowComponent`, which accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)

  Properties passed to `cellComponent` have the same names as arguments passed to the `headerCellTemplate` function with the following exceptions: the `onSort`, `onGroup`, `onWidthChange` and `onDraftWidthChange` properties are used instead of the `changeSortingDirection`, `groupByColumn`, `changeColumnWidth` and `changeDraftColumnWidth` arguments respectively.

* **react-grid:** The TableRowDetail plugin's `detailToggleCellWidth` property has been renamed to `toggleColumnWidth`. The `template`, `detailCellTemplate`, `detailRowTemplate`, and `detailToggleCellTemplate` properties have been replaced with  `contentComponent`, `cellComponent`, `rowComponent`, and `toggleCellComponent` ones, which accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)

  Properties passed to `cellComponent` have the same names as arguments passed to the `detailCellTemplate` function except for the `children` property, which is used instead of the `template` argument.

  Properties passed to `toggleCellComponent` have the same names as arguments passed to the `detailToggleCellTemplate` function except for the `onToggle` property, which is used instead of the `toggleExpanded` argument.
* **react-grid:** The TableSelection plugin's `highlightSelected` property has been renamed to `highlightRow`. The `selectCellTemplate` and `selectAllCellTemplate` properties have been replaced with `cellComponent`, and `headerCellComponent` ones, which accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)

  Properties passed to `headerCellComponent` have the same names as arguments passed to the `selectAllCellTemplate` function with the following exceptions:
  * The `onToggle` property is used instead of the `toggleAll` argument.
  * The `disabled` property is used instead of the `selectionAvailable` argument and it's value is inverted.

  Properties passed to `cellComponent` have the same names as arguments passed to the `selectCellTemplate` function except for the `onToggle` property, which is used instead of the `changeSelected` argument.

* **react-grid:** The Table's `tableLayoutTemplate`, `tableCellTemplate`, `tableRowTemplate`, `tableNoDataCellTemplate`, `tableNoDataRowTemplate`, `tableStubCellTemplate`, and `tableStubHeaderCellComponent` properties have been replaced with `layoutComponent`, `cellComponent`, `rowComponent`, `noDataCellComponent`, `noDataRowComponent`, `stubCellComponent` and `stubHeaderCellComponent`. This also means that they accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)

* **react-grid:** The Grid's `rootTemplate`, `headerPlaceholderTemplate`, and `footerPlaceholderTemplate` properties have been replaced with `rootComponent`, `headerPlaceholderComponent`, and `footerPlaceholderComponent`. This also means that they accept components instead of render functions. Find more details here: [#496](https://github.com/DevExpress/devextreme-reactive/issues/496)

  The `headerTemplate`, `bodyTemplate`, and `footerTemplate` properties have been replaced with the `children` property in `rootTemplate`.

<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.14...v1.0.0-beta.1) (2017-11-10)


### Bug Fixes

* **react-grid:** cancel find of nested groups within an empty childRows array ([#460](https://github.com/DevExpress/devextreme-reactive/issues/460)) ([c1c3982](https://github.com/DevExpress/devextreme-reactive/commit/c1c3982))
* **react-grid:** correct focus behavior when switching to row edit mode ([#455](https://github.com/DevExpress/devextreme-reactive/issues/455)) ([aceada7](https://github.com/DevExpress/devextreme-reactive/commit/aceada7))
* **react-grid:** repair group rows keys ([#456](https://github.com/DevExpress/devextreme-reactive/issues/456)) ([f3021b9](https://github.com/DevExpress/devextreme-reactive/commit/f3021b9))
* **react-grid-bootstrap3:** adjust vertical align of controls inside cells ([#466](https://github.com/DevExpress/devextreme-reactive/issues/466)) ([d982f31](https://github.com/DevExpress/devextreme-reactive/commit/d982f31))
* **react-grid-material-ui:** normalize checkboxes size ([#450](https://github.com/DevExpress/devextreme-reactive/issues/450)) ([10b61d9](https://github.com/DevExpress/devextreme-reactive/commit/10b61d9))
* **react-grid-material-ui:** normalize heights of rows with checkboxes ([#445](https://github.com/DevExpress/devextreme-reactive/issues/445)) ([123ed27](https://github.com/DevExpress/devextreme-reactive/commit/123ed27))


### Code Refactoring

* **react-grid:** export TableColumnResizing from theme packages ([#438](https://github.com/DevExpress/devextreme-reactive/issues/438)) ([4be4ebf](https://github.com/DevExpress/devextreme-reactive/commit/4be4ebf))
* **rect-grid:** refactor table column reordering ([#424](https://github.com/DevExpress/devextreme-reactive/issues/424)) ([dc28366](https://github.com/DevExpress/devextreme-reactive/commit/dc28366)), closes [#154](https://github.com/DevExpress/devextreme-reactive/issues/154)


### Features

* **react-grid:** add localization messages ([#385](https://github.com/DevExpress/devextreme-reactive/issues/385)) ([c7581bd](https://github.com/DevExpress/devextreme-reactive/commit/c7581bd))
* **react-grid:** add the capability to filter/sort grouped rows ([#443](https://github.com/DevExpress/devextreme-reactive/issues/443)) ([292d429](https://github.com/DevExpress/devextreme-reactive/commit/292d429))
* **react-grid:** allow to change sorting of the grouped columns by keyboard ([#461](https://github.com/DevExpress/devextreme-reactive/issues/461)) ([e50c973](https://github.com/DevExpress/devextreme-reactive/commit/e50c973))
* **react-grid:** allow to focus each column and change sorting ([#448](https://github.com/DevExpress/devextreme-reactive/issues/448)) ([0550848](https://github.com/DevExpress/devextreme-reactive/commit/0550848))
* **react-grid:** rework virtual table ([#454](https://github.com/DevExpress/devextreme-reactive/issues/454)) ([b28e365](https://github.com/DevExpress/devextreme-reactive/commit/b28e365)), closes [#33](https://github.com/DevExpress/devextreme-reactive/issues/33) [#280](https://github.com/DevExpress/devextreme-reactive/issues/280) [#401](https://github.com/DevExpress/devextreme-reactive/issues/401)
* **react-grid:** support expanding/collapsing detail rows with keyboard ([#446](https://github.com/DevExpress/devextreme-reactive/issues/446)) ([47ab49d](https://github.com/DevExpress/devextreme-reactive/commit/47ab49d))
* **react-grid:** support expanding/collapsing group rows with keyboard ([#439](https://github.com/DevExpress/devextreme-reactive/issues/439)) ([4176d9a](https://github.com/DevExpress/devextreme-reactive/commit/4176d9a))


### BREAKING CHANGES

* **rect-grid:** The `ColumnOrderState` plugin has been renamed to `TableColumnReordering` and is now available via the `@devexpress/dx-react-grid-bootstrap3` and `@devexpress/dx-react-grid-material-ui` packages.

  The `TableView` plugin's `allowColumnReordering` property has been removed and the `TableColumnReordering` plugin now depends on the `TableView` plugin. Thus, it is enough to link the `TableColumnReordering` plugin below the `TableView` plugin to enable column reordering.

  Before:
  ```jsx
  import {
    // ...
    ColumnOrderState
  } from '@devexpress/dx-react-grid';

  // ...

  <ColumnOrderState defaultOrder={[/* ... */]} />
  <TableView allowColumnReordering />
  ```

  After:
  ```jsx
  import {
    // ...
    TableColumnReordering
  } from '@devexpress/dx-react-grid-bootstrap3';
  // } from '@devexpress/dx-react-grid-material-ui';

  // ...

  <TableView />
  <TableColumnReordering defaultOrder={[/* ... */]} />
  ```
* **react-grid:** The TableColumnResizing plugin is now available in the "@devexpress/dx-react-grid-bootstrap3" and "@devexpress/dx-react-grid-material-ui" packages.

  Use the following code to import the plugin.

  ```
  import {
    TableColumnResizing,
  } from from '@devexpress/dx-react-grid-bootstrap3'/* or '@devexpress/dx-react-grid-material-ui' */;
  ```



<a name="1.0.0-alpha.14"></a>
# [1.0.0-alpha.14](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2017-10-25)


### Bug Fixes

* **react-grid:** remove header cell title offset if grouping by click isn't allowed ([#434](https://github.com/DevExpress/devextreme-reactive/issues/434)) ([60285d4](https://github.com/DevExpress/devextreme-reactive/commit/60285d4)), closes [#432](https://github.com/DevExpress/devextreme-reactive/issues/432)
* **react-grid-bootstrap3:** do not allow to focus column chooser item checkbox ([728ea23](https://github.com/DevExpress/devextreme-reactive/commit/728ea23))


### Features

* **react-grid:** support custom grouping processing ([#395](https://github.com/DevExpress/devextreme-reactive/issues/395)) ([4fb92d0](https://github.com/DevExpress/devextreme-reactive/commit/4fb92d0))



<a name="1.0.0-alpha.13"></a>
# [1.0.0-alpha.13](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2017-10-19)


### Bug Fixes

* **react-grid:** remove a redundant SelectionState dependency on LocalGrouping ([#429](https://github.com/DevExpress/devextreme-reactive/issues/429)) ([50ee891](https://github.com/DevExpress/devextreme-reactive/commit/50ee891)), closes [#428](https://github.com/DevExpress/devextreme-reactive/issues/428)



<a name="1.0.0-alpha.12"></a>
# [1.0.0-alpha.12](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2017-10-19)


### Bug Fixes

* **react-grid:** add 'overflow: hidden' for MUI TableCell ([#406](https://github.com/DevExpress/devextreme-reactive/issues/406)) ([69fd88c](https://github.com/DevExpress/devextreme-reactive/commit/69fd88c)), closes [#403](https://github.com/DevExpress/devextreme-reactive/issues/403)
* **react-grid:** allow to use Grid with react@16 ([#389](https://github.com/DevExpress/devextreme-reactive/issues/389)) ([9f292fe](https://github.com/DevExpress/devextreme-reactive/commit/9f292fe))
* **react-grid:** correlate sorting order with grouping order ([#414](https://github.com/DevExpress/devextreme-reactive/issues/414)) ([db3377c](https://github.com/DevExpress/devextreme-reactive/commit/db3377c)), closes [#398](https://github.com/DevExpress/devextreme-reactive/issues/398)
* **react-grid:** optimize table selection rendering ([#412](https://github.com/DevExpress/devextreme-reactive/issues/412)) ([b0dfae1](https://github.com/DevExpress/devextreme-reactive/commit/b0dfae1)), closes [#397](https://github.com/DevExpress/devextreme-reactive/issues/397)
* **react-grid-bootstrap3:** fix server side rendering issue with VirtualTable ([#420](https://github.com/DevExpress/devextreme-reactive/issues/420)) ([207e81b](https://github.com/DevExpress/devextreme-reactive/commit/207e81b)), closes [#415](https://github.com/DevExpress/devextreme-reactive/issues/415)


### Features

* **react-grid:** implement column chooser ([#366](https://github.com/DevExpress/devextreme-reactive/issues/366)) ([74b99c1](https://github.com/DevExpress/devextreme-reactive/commit/74b99c1))


### Performance Improvements

* **react-core:** batch updates on draggable events ([#384](https://github.com/DevExpress/devextreme-reactive/issues/384)) ([51efef1](https://github.com/DevExpress/devextreme-reactive/commit/51efef1))


### BREAKING CHANGES

* **react-grid:** The `scope` parameter of the `setColumnSorting` action has been removed.

  The `GroupingState` plugin now has an optional dependency on the `SortingState` plugin. So, `GroupingState` should be placed after `SortingState`.

  Before:

  ```jsx
  <GroupingState /* ... */ />
  <SortingState /* ... */ />
  ```

  After:

  ```jsx
  <SortingState /* ... */ />
  <GroupingState /* ... */ />
  ```



<a name="1.0.0-alpha.11"></a>
# [1.0.0-alpha.11](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2017-10-04)


### Bug Fixes

* **react-core:** update TemplatePlacholder on placeholder func change ([#370](https://github.com/DevExpress/devextreme-reactive/issues/370)) ([69659c8](https://github.com/DevExpress/devextreme-reactive/commit/69659c8))
* **react-grid:** add 'pointer' cursor on group icon in the HeaderCell ([#369](https://github.com/DevExpress/devextreme-reactive/issues/369)) ([8d1de4a](https://github.com/DevExpress/devextreme-reactive/commit/8d1de4a))


### Code Refactoring

* **react-grid:** change custom filtering function signature ([#354](https://github.com/DevExpress/devextreme-reactive/issues/354)) ([67cfdc9](https://github.com/DevExpress/devextreme-reactive/commit/67cfdc9))
* **react-grid:** rename getCellData to getCellValue ([#349](https://github.com/DevExpress/devextreme-reactive/issues/349)) ([8f8e41d](https://github.com/DevExpress/devextreme-reactive/commit/8f8e41d))


### Features

* **react-grid:** add custom grouping functions to LocalGrouping ([#376](https://github.com/DevExpress/devextreme-reactive/issues/376)) ([2c31af1](https://github.com/DevExpress/devextreme-reactive/commit/2c31af1))
* **react-grid:** add the functionality to define a custom sorting algorithm ([#371](https://github.com/DevExpress/devextreme-reactive/issues/371)) ([4ac8ab8](https://github.com/DevExpress/devextreme-reactive/commit/4ac8ab8))
* **react-grid:** support column data types ([#336](https://github.com/DevExpress/devextreme-reactive/issues/336)) ([1528800](https://github.com/DevExpress/devextreme-reactive/commit/1528800))


### Performance Improvements

* **react-grid:** optimize internal state calculation ([#356](https://github.com/DevExpress/devextreme-reactive/issues/356)) ([be890b4](https://github.com/DevExpress/devextreme-reactive/commit/be890b4))
* **react-grid:** suppress redundant render ([#355](https://github.com/DevExpress/devextreme-reactive/issues/355)) ([695aacd](https://github.com/DevExpress/devextreme-reactive/commit/695aacd))


### BREAKING CHANGES

* **react-grid:** The `filterFn` property of the `LocalFiltering` has been renamed to `getColumnPredicate`. The argument list has been changed from `filterFn(row: Row, filter: Filter) => boolean` to  `getColumnPredicate(columnName: string) => Function`.  The returning function has the following signature `(value: any, filter, row: Row) => boolean`.
* **react-grid:** The `getCellData` property of the TableView plugin and the `getCellData` field of the Column interface have been renamed to `getCellValue`.



<a name="1.0.0-alpha.10"></a>
# [1.0.0-alpha.10](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2017-09-18)


### Bug Fixes

* **react-core:** use correct params within template chain ([#322](https://github.com/DevExpress/devextreme-reactive/issues/322)) ([64a9991](https://github.com/DevExpress/devextreme-reactive/commit/64a9991))


### Code Refactoring

* **react-core:** remove embedded Template connection ([#331](https://github.com/DevExpress/devextreme-reactive/issues/331)) ([f90955d](https://github.com/DevExpress/devextreme-reactive/commit/f90955d))
* **react-grid:** rename tableTemplate to tableLayoutTemplate ([#310](https://github.com/DevExpress/devextreme-reactive/issues/310)) ([def4a97](https://github.com/DevExpress/devextreme-reactive/commit/def4a97))


### Features

* **react-core:** implement TemplateConnector ([#314](https://github.com/DevExpress/devextreme-reactive/issues/314)) ([1e9bcfc](https://github.com/DevExpress/devextreme-reactive/commit/1e9bcfc))
* **react-grid:** add tableRowTemplate to the TableView plugin ([#317](https://github.com/DevExpress/devextreme-reactive/issues/317)) ([24d9446](https://github.com/DevExpress/devextreme-reactive/commit/24d9446))
* **react-grid:** implement row templates ([#333](https://github.com/DevExpress/devextreme-reactive/issues/333)) ([bc960d4](https://github.com/DevExpress/devextreme-reactive/commit/bc960d4))
* **react-grid:** implement table column resizing ([#297](https://github.com/DevExpress/devextreme-reactive/issues/297)) ([a377d3c](https://github.com/DevExpress/devextreme-reactive/commit/a377d3c))
* **react-grid:** make grouped and ungrouped column sorting independent ([#292](https://github.com/DevExpress/devextreme-reactive/issues/292)) ([c812fa3](https://github.com/DevExpress/devextreme-reactive/commit/c812fa3))


### BREAKING CHANGES

* **react-grid:** The `tableExtraProps` getter was removed from the `TableView` and `TableSelection` plugins.
* **react-core:** `connectGetters` and `connectActions` properties have been removed from the Template component. From now on, you can connect Getters and Actions using the TemplateConnector component.

Before:

```jsx
<Template name="templateName"
  connectGetters={getter => ({ value: getter('value') })}
  connectActions={action => ({ changeValue: action('changeValue') })}
>
  {({ value, changeValue }) => /* ... */}
</Template>
```

After:

```jsx
<Template name="templateName">
  <TemplateConnector>
    {({ value }, { changeValue }) =>  /* ... */}
  </TemplateConnector>
</Template>
```
* **react-grid:** The `tableTemplate` property has been renamed to `tableLayoutTemplate` to make the `TableView` plugin API more eloquent.



<a name="1.0.0-alpha.9"></a>
# [1.0.0-alpha.9](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2017-09-04)


### Bug Fixes

* **react-grid:** display a correct message in an empty grouping panel ([#274](https://github.com/DevExpress/devextreme-reactive/issues/274)) ([46b5291](https://github.com/DevExpress/devextreme-reactive/commit/46b5291))
* **react-grid:** fix the editing state mutation ([#279](https://github.com/DevExpress/devextreme-reactive/issues/279)) ([a120730](https://github.com/DevExpress/devextreme-reactive/commit/a120730))
* **react-grid:** update MUI to the 1.0.0-beta.6 version ([#275](https://github.com/DevExpress/devextreme-reactive/issues/275)) ([9032c34](https://github.com/DevExpress/devextreme-reactive/commit/9032c34)), closes [#271](https://github.com/DevExpress/devextreme-reactive/issues/271)
* **react-grid:** update MUI to the 1.0.0-beta.7 version ([#296](https://github.com/DevExpress/devextreme-reactive/issues/296)) ([7d7d649](https://github.com/DevExpress/devextreme-reactive/commit/7d7d649))



<a name="1.0.0-alpha.8"></a>
# [1.0.0-alpha.8](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2017-08-21)


### Bug Fixes

* **react-grid:** correct pager rendering within an empty grid ([#251](https://github.com/DevExpress/devextreme-reactive/issues/251)) ([eb13a8b](https://github.com/DevExpress/devextreme-reactive/commit/eb13a8b))
* **react-grid:** get rid of the exception thrown on a column ungrouping by drag and drop ([#260](https://github.com/DevExpress/devextreme-reactive/issues/260)) ([8fc2990](https://github.com/DevExpress/devextreme-reactive/commit/8fc2990))
* **react-grid:** preserve group panel height when no grouping is specified ([#261](https://github.com/DevExpress/devextreme-reactive/issues/261)) ([9116e92](https://github.com/DevExpress/devextreme-reactive/commit/9116e92))


### Code Refactoring

* **react-grid:** change TableRow and TableColumn interfaces structure ([#227](https://github.com/DevExpress/devextreme-reactive/issues/227)) ([5288a9f](https://github.com/DevExpress/devextreme-reactive/commit/5288a9f))
* **react-grid:** merge the setRowSelection and setRowsSelection actions ([#233](https://github.com/DevExpress/devextreme-reactive/issues/233)) ([876a2c6](https://github.com/DevExpress/devextreme-reactive/commit/876a2c6))
* **react-grid:** remove redundant getters from GroupingState ([#244](https://github.com/DevExpress/devextreme-reactive/issues/244)) ([1fb21ca](https://github.com/DevExpress/devextreme-reactive/commit/1fb21ca))
* **react-grid:** rename colspan to colSpan ([#248](https://github.com/DevExpress/devextreme-reactive/issues/248)) ([afc69e9](https://github.com/DevExpress/devextreme-reactive/commit/afc69e9))
* **react-grid:** wrap group panel column data ([#267](https://github.com/DevExpress/devextreme-reactive/issues/267)) ([156392b](https://github.com/DevExpress/devextreme-reactive/commit/156392b))


### Features

* **react-core:** rework Getter ([#259](https://github.com/DevExpress/devextreme-reactive/issues/259)) ([4fd5f9b](https://github.com/DevExpress/devextreme-reactive/commit/4fd5f9b))
* **react-grid:** adopt PluginContainer dependencies in Grid plugins ([#249](https://github.com/DevExpress/devextreme-reactive/issues/249)) ([016f618](https://github.com/DevExpress/devextreme-reactive/commit/016f618))
* **react-grid:** provide the custom data accessors capability ([#264](https://github.com/DevExpress/devextreme-reactive/issues/264)) ([5f699bf](https://github.com/DevExpress/devextreme-reactive/commit/5f699bf)), closes [#176](https://github.com/DevExpress/devextreme-reactive/issues/176)


### Performance Improvements

* **react-grid:** optimize plugin dependencies check ([#253](https://github.com/DevExpress/devextreme-reactive/issues/253)) ([640c124](https://github.com/DevExpress/devextreme-reactive/commit/640c124))


### BREAKING CHANGES

* **react-grid:**
The following changes have been made in the GroupingPanel plugin:
  - the `groupPanelCellTemplate` property has been renamed to `groupPanelItemTemplate`;
  - the `groupedColumns` property has been renamed to `groupingPanelItems` and now contains an array of objects which conform the GroupingPanelItem interface.

  The `isDraft` property of the DraftGrouping interface has been renamed to `draft`.
* **react-grid:**  
In order to reduce API verbosity, the `groupedColumns` and `draftGroupedColumns` getters are no longer exported from the GroupingState plugin.
 
The `column` field is no longer present in the GroupRow interface. So, to access the `column` field in groupCellTemplate and groupIndentCellTemplate of the TableGroupRow plugin, it is necessary to use `args.column` instead of `args.row.column`.
* **react-grid:** The `colspan` field passed to tableNoDataCellTemplate (the TableView plugin), detailCellTemplate (the TableRowDetail plugin) and groupCellTemplate (the TableGroupRow plugin) has been renamed to `colSpan`.
* **react-grid:** To simplify the Grid plugins API the `setRowSelection` action was removed from the `SelectionState` and `TableSelection` plugins.

  For now, to select a single row you can use the `setRowsSelection`  action in the following manner:

    ```js
    setRowsSelection({ rowIds: [/* rowId */] })
    ```
* **react-grid:**  
`TableRow` and `TableColumn` interfaces structure has been changed. Now, it wraps original rows and columns of the Grid component instead of patching it.

  Before:

  ```ts
  interface TableRow extends Row {
    type?: string;
  }
  interface TableColumn extends Column {
    type?: string;
  }
  ```

  After:

  ```ts
  interface TableRow {
    key: string;
    type: string;
    rowId?: number | string;
    row?: Row;
    height?: number;
  }
  interface TableColumn {
    key: string;
    type: string;
    column?: Column;
    width?: number;
  }
  ```


  The `CommandHeadingCellArgs` interface related to the TableEditColumn plugin no longer has `column` and `row` fields.



<a name="1.0.0-alpha.7"></a>
# [1.0.0-alpha.7](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2017-08-07)


### Bug Fixes

* **react-grid:** allow TableGroupRow to be placed before other table plugins ([#221](https://github.com/DevExpress/devextreme-reactive/issues/221)) ([bdc81a0](https://github.com/DevExpress/devextreme-reactive/commit/bdc81a0))
* **react-grid:** correct 'All' page size text rendering in MUI ([#242](https://github.com/DevExpress/devextreme-reactive/issues/242)) ([6bde2dd](https://github.com/DevExpress/devextreme-reactive/commit/6bde2dd))
* **react-grid:** fix grouping if TableGroupRow is placed before any other table plugin ([#218](https://github.com/DevExpress/devextreme-reactive/issues/218)) ([7e09c7e](https://github.com/DevExpress/devextreme-reactive/commit/7e09c7e))
* **react-grid:** pass style field to editCellTemplate of TableEditRow ([#235](https://github.com/DevExpress/devextreme-reactive/issues/235)) ([c45ef85](https://github.com/DevExpress/devextreme-reactive/commit/c45ef85)), closes [#234](https://github.com/DevExpress/devextreme-reactive/issues/234)
* **react-grid:** prevent group panel cells blinking while dragging ([#223](https://github.com/DevExpress/devextreme-reactive/issues/223)) ([786206d](https://github.com/DevExpress/devextreme-reactive/commit/786206d))
* **react-grid:** remove extra space at the right of GroupPanelCell when sorting is disabled ([#220](https://github.com/DevExpress/devextreme-reactive/issues/220)) ([257a337](https://github.com/DevExpress/devextreme-reactive/commit/257a337))
* **react-grid:** use correct cursors for dragging ([#224](https://github.com/DevExpress/devextreme-reactive/issues/224)) ([6269063](https://github.com/DevExpress/devextreme-reactive/commit/6269063))
* **react-grid-material-ui:** support indeterminate state for the select all checkbox ([#231](https://github.com/DevExpress/devextreme-reactive/issues/231)) ([6a5aab3](https://github.com/DevExpress/devextreme-reactive/commit/6a5aab3))


### Chores

* **react-grid-material-ui:** swap UMD bundle with CJS one in package entry ([#232](https://github.com/DevExpress/devextreme-reactive/issues/232)) ([9dd4273](https://github.com/DevExpress/devextreme-reactive/commit/9dd4273))


### Code Refactoring

* **react-grid:** add the most recently added row to the end ([#238](https://github.com/DevExpress/devextreme-reactive/issues/238)) ([442bdbc](https://github.com/DevExpress/devextreme-reactive/commit/442bdbc))


### Features

* **react-core:** implement dependencies support for PluginContainer ([#237](https://github.com/DevExpress/devextreme-reactive/issues/237)) ([6ef3be6](https://github.com/DevExpress/devextreme-reactive/commit/6ef3be6))


### BREAKING CHANGES

* **react-grid:** In order to improve API transparency, the most recently added row will be added to the end of the addedRows property of the EditingState plugin.
* **react-grid-material-ui:** UMD bundle for the `@devexpress/dx-react-grid-material-ui` package is no longer provided
* **react-grid:** Arguments of the `setPageSize` and `setCurrentPage` actions were simpilified. Now, to call these actions, a user can use `numbers` instead of `objects`. See the following code:
  ```
  setPageSize(5); // instead of setPageSize({ size: 5 })
  ```
  and
  ```
  setCurrentPage(1); // instead of setCurrentPage({ page: 1 })
  ```



<a name="1.0.0-alpha.6"></a>
# [1.0.0-alpha.6](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2017-07-24)


### Bug Fixes

* **react-core:** prevent scrolling while dragging ([#207](https://github.com/DevExpress/devextreme-reactive/issues/207)) ([e3e18a9](https://github.com/DevExpress/devextreme-reactive/commit/e3e18a9))
* **react-grid:** clear expanded groups after ungrouping ([#202](https://github.com/DevExpress/devextreme-reactive/issues/202)) ([d97809e](https://github.com/DevExpress/devextreme-reactive/commit/d97809e))
* **react-grid:** remove the totalPages getter from the PagingState plugin ([#195](https://github.com/DevExpress/devextreme-reactive/issues/195)) ([e231d63](https://github.com/DevExpress/devextreme-reactive/commit/e231d63))
* **react-grid:** throw error if the count of title rows exceeds the page size ([#193](https://github.com/DevExpress/devextreme-reactive/issues/193)) ([8abde20](https://github.com/DevExpress/devextreme-reactive/commit/8abde20))
* **react-grid:** turn edit cell input into the controlled mode ([#201](https://github.com/DevExpress/devextreme-reactive/issues/201)) ([af26c64](https://github.com/DevExpress/devextreme-reactive/commit/af26c64))
* **react-grid-material-ui:** pin material-ui version ([#197](https://github.com/DevExpress/devextreme-reactive/issues/197)) ([34e6ddb](https://github.com/DevExpress/devextreme-reactive/commit/34e6ddb))
* fix versions in distrubutives ([#208](https://github.com/DevExpress/devextreme-reactive/issues/208)) ([7c2f9da](https://github.com/DevExpress/devextreme-reactive/commit/7c2f9da))
* **react-grid-material-ui:** use correct typography for the drag preview ([#214](https://github.com/DevExpress/devextreme-reactive/issues/214)) ([e1a134d](https://github.com/DevExpress/devextreme-reactive/commit/e1a134d))


### Features

* **react-grid:** implement grouping by drag and drop ([#205](https://github.com/DevExpress/devextreme-reactive/issues/205)) ([ebb6c61](https://github.com/DevExpress/devextreme-reactive/commit/ebb6c61))


### Performance Improvements

* **react-grid:** update only changed rows in table ([#199](https://github.com/DevExpress/devextreme-reactive/issues/199)) ([e1c64ff](https://github.com/DevExpress/devextreme-reactive/commit/e1c64ff))


### Reverts

* fix(react-grid): grid bottom offset in Material-UI ([#196](https://github.com/DevExpress/devextreme-reactive/issues/196)) ([e2392ed](https://github.com/DevExpress/devextreme-reactive/commit/e2392ed))


### BREAKING CHANGES

* **react-grid:** The TableHeaderRow plugin's `allowGrouping` property has been renamed to `allowGroupingByClick`.
* **react-grid:** The `totalPages` getter is no longer exported from the PagingState and LocalPaging plugins.



<a name="1.0.0-alpha.5"></a>
# [1.0.0-alpha.5](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2017-07-07)


### Bug Fixes

* **react-grid:** add grid bottom offset in Material-UI ([#180](https://github.com/DevExpress/devextreme-reactive/issues/180)) ([48f12a2](https://github.com/DevExpress/devextreme-reactive/commit/48f12a2))
* **react-grid:** add group icon offset in Material-UI ([#171](https://github.com/DevExpress/devextreme-reactive/issues/171)) ([43d9da1](https://github.com/DevExpress/devextreme-reactive/commit/43d9da1))
* **react-grid:** limit filterCellTemplate arguments ([#163](https://github.com/DevExpress/devextreme-reactive/issues/163)) ([2a4f003](https://github.com/DevExpress/devextreme-reactive/commit/2a4f003))
* **react-grid:** reset a column filter when clearing the filter editor value ([#184](https://github.com/DevExpress/devextreme-reactive/issues/184)) ([83b321c](https://github.com/DevExpress/devextreme-reactive/commit/83b321c)), closes [#136](https://github.com/DevExpress/devextreme-reactive/issues/136)
* **react-grid:** use MUI Chips for group panel items rendering ([#168](https://github.com/DevExpress/devextreme-reactive/issues/168)) ([45ceb12](https://github.com/DevExpress/devextreme-reactive/commit/45ceb12))


### Code Refactoring

* **react-grid:** extract GroupPanelLayout ([#149](https://github.com/DevExpress/devextreme-reactive/issues/149)) ([ed73aa1](https://github.com/DevExpress/devextreme-reactive/commit/ed73aa1))


### Features

* **react-grid:** introduce column reordering animation ([#169](https://github.com/DevExpress/devextreme-reactive/issues/169)) ([d5e808b](https://github.com/DevExpress/devextreme-reactive/commit/d5e808b))
* **react-grid:** introduce Material-UI templates (closes [#93](https://github.com/DevExpress/devextreme-reactive/issues/93))


### BREAKING CHANGES

* **react-grid:** Use the `groupPanelCellTemplate` property of the grouping-panel plugin instead of the GroupPanelProps interface's `cellTemplate` property to specify a template used to render a grouping panel cell. The GroupPanelProps interface's `cellTemplate` property is no longer available.



<a name="1.0.0-alpha.4"></a>
# [1.0.0-alpha.4](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2017-06-23)


### Bug Fixes

* **react-grid:** Add a vertical space between grouping buttons ([#151](https://github.com/DevExpress/devextreme-reactive/issues/151)) ([ec1bd30](https://github.com/DevExpress/devextreme-reactive/commit/ec1bd30))
* **react-grid:** Add an offset for left column in Material-UI ([#156](https://github.com/DevExpress/devextreme-reactive/issues/156)) ([67d0eda](https://github.com/DevExpress/devextreme-reactive/commit/67d0eda))
* **react-grid:** Fix incorrect table layout if all columns have fixed width ([#160](https://github.com/DevExpress/devextreme-reactive/issues/160)) ([b933aea](https://github.com/DevExpress/devextreme-reactive/commit/b933aea))
* **react-grid:** Put the dx-react-grid dependencies in order ([#148](https://github.com/DevExpress/devextreme-reactive/issues/148)) ([fe60801](https://github.com/DevExpress/devextreme-reactive/commit/fe60801))
* **react-grid:** Update deps (fixes [#134](https://github.com/DevExpress/devextreme-reactive/issues/134)) ([#139](https://github.com/DevExpress/devextreme-reactive/issues/139)) ([5bf504a](https://github.com/DevExpress/devextreme-reactive/commit/5bf504a))


### Code Refactoring

* **react-grid:** Rename detailToggleTemplate to detailToggleCellTemplate ([#146](https://github.com/DevExpress/devextreme-reactive/issues/146)) ([bd49b0e](https://github.com/DevExpress/devextreme-reactive/commit/bd49b0e))
* **react-grid:** Rename groupColumnWidth to groupIndentColumnWidth ([#145](https://github.com/DevExpress/devextreme-reactive/issues/145)) ([e78b55f](https://github.com/DevExpress/devextreme-reactive/commit/e78b55f))
* **react-grid:** Rename groupRowCellTemplate to groupCellTemplate ([#153](https://github.com/DevExpress/devextreme-reactive/issues/153)) ([fec0aac](https://github.com/DevExpress/devextreme-reactive/commit/fec0aac))


### Features

* **react-grid:** Ability to show all rows on a page via page size selector ([#150](https://github.com/DevExpress/devextreme-reactive/issues/150)) ([8af3dde](https://github.com/DevExpress/devextreme-reactive/commit/8af3dde))
* **react-grid:** Implement column reordering ([#128](https://github.com/DevExpress/devextreme-reactive/issues/128)) ([1de1c63](https://github.com/DevExpress/devextreme-reactive/commit/1de1c63))
* **react-grid:** TableView support stub cell rendering if no data for cell is provided ([#155](https://github.com/DevExpress/devextreme-reactive/issues/155)) ([34dee6c](https://github.com/DevExpress/devextreme-reactive/commit/34dee6c))


### BREAKING CHANGES

* **react-grid:** The following package has become a peer dependency of the `@devexpress/dx-react-grid` one and has to be installed by your app:

  ```
  npm i --save @devexpress/dx-react-core
  ```

* **react-grid:** The 'groupRowCellTemplate' property of the TableGroupRow plugin has been renamed to 'groupCellTemplate'
* **react-grid:** We renamed the `detailToggleTemplate` property of the TableRowDetail plugin to `detailToggleCellTemplate` to make it consistent with the `detailToggleCellWidth` property.
* **react-grid:** The groupColumnWidth property of the TableGroupRow plugin has been renamed to groupIndentColumnWidth to avoid possible confusion of what it is responsible for.



<a name="1.0.0-alpha.3"></a>
# [1.0.0-alpha.3](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2017-06-09)


### Bug Fixes

* **react-grid:** Cancel sorting by using the Ctrl key in Material-UI ([#129](https://github.com/DevExpress/devextreme-reactive/issues/129)) ([2508537](https://github.com/DevExpress/devextreme-reactive/commit/2508537))
* **react-grid:** Treat templates as functions ([#120](https://github.com/DevExpress/devextreme-reactive/issues/120)) ([4b2c490](https://github.com/DevExpress/devextreme-reactive/commit/4b2c490))


### Code Refactoring

* **react-grid:** Move layout templates to Grid ([#107](https://github.com/DevExpress/devextreme-reactive/issues/107)) ([f6be302](https://github.com/DevExpress/devextreme-reactive/commit/f6be302))


### Features

* **react-grid:** Controlled state featured demo for Material-UI ([#130](https://github.com/DevExpress/devextreme-reactive/issues/130)) ([2528c67](https://github.com/DevExpress/devextreme-reactive/commit/2528c67))
* **react-grid:** Implement ColumnOrderState plugin ([#111](https://github.com/DevExpress/devextreme-reactive/issues/111)) ([b3284f0](https://github.com/DevExpress/devextreme-reactive/commit/b3284f0))
* **react-grid:** Implement DragDropContext plugin ([#117](https://github.com/DevExpress/devextreme-reactive/issues/117)) ([31f6b2d](https://github.com/DevExpress/devextreme-reactive/commit/31f6b2d))
* **react-grid:** Introduce Material-UI templates ([#102](https://github.com/DevExpress/devextreme-reactive/issues/102)) ([70975a7](https://github.com/DevExpress/devextreme-reactive/commit/70975a7))
* **react-grid:** Material-UI detail row ([#115](https://github.com/DevExpress/devextreme-reactive/issues/115)) ([c161c66](https://github.com/DevExpress/devextreme-reactive/commit/c161c66))
* **react-grid:** Material-UI editing ([#124](https://github.com/DevExpress/devextreme-reactive/issues/124)) ([3d9a00b](https://github.com/DevExpress/devextreme-reactive/commit/3d9a00b))
* **react-grid:** Material-UI featured uncontrolled state demo ([#126](https://github.com/DevExpress/devextreme-reactive/issues/126)) ([8e1d80b](https://github.com/DevExpress/devextreme-reactive/commit/8e1d80b))
* **react-grid:** Material-UI filtering ([#109](https://github.com/DevExpress/devextreme-reactive/issues/109)) ([5484942](https://github.com/DevExpress/devextreme-reactive/commit/5484942))
* **react-grid:** Material-UI pager ([#108](https://github.com/DevExpress/devextreme-reactive/issues/108)) ([99f30b6](https://github.com/DevExpress/devextreme-reactive/commit/99f30b6))
* **react-grid:** Mobile-friendly pager ([#125](https://github.com/DevExpress/devextreme-reactive/issues/125)) ([23ec7f0](https://github.com/DevExpress/devextreme-reactive/commit/23ec7f0))
* **react-grid:** Redux integration demo for Material-UI ([#132](https://github.com/DevExpress/devextreme-reactive/issues/132)) ([9988355](https://github.com/DevExpress/devextreme-reactive/commit/9988355))
* **react-grid:** Remote data featured demo for Material-UI ([#131](https://github.com/DevExpress/devextreme-reactive/issues/131)) ([41b64b2](https://github.com/DevExpress/devextreme-reactive/commit/41b64b2))
* **react-grid:** Use column name if its title is not specified ([#121](https://github.com/DevExpress/devextreme-reactive/issues/121)) ([daef7db](https://github.com/DevExpress/devextreme-reactive/commit/daef7db))


### BREAKING CHANGES

* **react-grid:** We moved layout templates from the TableView plugin to the Grid component. The Grid component with the predefined plugins is now available in the "@devexpress/dx-react-grid-bootstrap3" package. If you want to define custom layout templates, the Grid component without predefined templates is still available in the "devexpress/dx-react-grid" package.

  The following code:

  ```jsx
  import {
    Grid
  } from '@devexpress/dx-react-grid';
  ```

  should be replaced with:

  ```jsx
  import {
    Grid
  } from '@devexpress/dx-react-grid-bootstrap3';
  ```



<a name="1.0.0-alpha.2"></a>
# [1.0.0-alpha.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2017-05-26)


### Bug Fixes

* **demos:** Change initial page size in remote demo ([#103](https://github.com/DevExpress/devextreme-reactive/issues/103)) ([aa64e3c](https://github.com/DevExpress/devextreme-reactive/commit/aa64e3c))
* **docs:** Don't use relative links in the package root readme.md ([#91](https://github.com/DevExpress/devextreme-reactive/issues/91)) ([6863e73](https://github.com/DevExpress/devextreme-reactive/commit/6863e73))
* **react-grid:** Cancel column grouping in FireFox ([#98](https://github.com/DevExpress/devextreme-reactive/issues/98)) ([8fb9c52](https://github.com/DevExpress/devextreme-reactive/commit/8fb9c52)), closes [#30](https://github.com/DevExpress/devextreme-reactive/issues/30)


### Features

* **react-grid:** Cancel sorting by using the Ctrl key ([#96](https://github.com/DevExpress/devextreme-reactive/issues/96)) ([0d804f4](https://github.com/DevExpress/devextreme-reactive/commit/0d804f4))
* **react-grid:** Implement page size selector ([#95](https://github.com/DevExpress/devextreme-reactive/issues/95)) ([9e21583](https://github.com/DevExpress/devextreme-reactive/commit/9e21583))


### BREAKING CHANGES

* Previously, to enable the 'Detail row' feature a user had to use only the 'TableRowDetail' plugin. But, this plugin mixed up the rendering and state managing functionality. Now, there are two particular plugins. The first one is the 'RowDetailState' plugin. It's responsible for a state managing. The second one is the 'TableRowDetail' plugin. It only renders a detail row.

  The following code:

  ```jsx
  <TableRowDetail
    expandedRows={expandedRows}
    onExpandedRowsChange={onExpandedRowsChange}
    template={({ row }) =>
      <GridDetailContainer
        data={row}
        columns={detailColumns}
      />
    }
  />
  ```

  should be replaced with:

  ```jsx
  <RowDetailState
    expandedRows={expandedRows}
    onExpandedRowsChange={onExpandedRowsChange}
  />
  <TableRowDetail
    template={({ row }) =>
      <GridDetailContainer
        data={row}
        columns={detailColumns}
      />
    }
  />
  ```

<a name="1.0.0-alpha.1"></a>
# 1.0.0-alpha.1 (2017-05-15)

* Initial public release
