import { Plugin, WorkspaceLeaf } from "obsidian";

import { VIEW_TYPE_CALENDAR } from "./constants";
import CalendarView from "./view";

export default class CalendarPlugin extends Plugin {
  onload() {
    this.registerView(
      VIEW_TYPE_CALENDAR,
      // @ts-ignore
      (leaf: WorkspaceLeaf) => new CalendarView(leaf)
    );
  }

  onInit() {
    if (this.app.workspace.layoutReady) {
      this.initLeaf();
    }
    this.registerEvent(
      this.app.workspace.on("layout-ready", this.initLeaf.bind(this))
    );
  }

  onUserEnable() {
    this.initLeaf();
  }

  onEnable() {
    this.initLeaf();
  }

  initLeaf() {
    if (this.app.workspace.getLeavesOfType(VIEW_TYPE_CALENDAR).length) {
      return;
    }
    this.app.workspace.getRightLeaf(false).setViewState({
      type: VIEW_TYPE_CALENDAR,
    });
  }
}