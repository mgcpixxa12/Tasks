# Campus Cares Planner — Calendar Update v4

This build makes Calendar the default landing screen, wraps days into a responsive grid, and keeps Add Task / Add Travel controls fully visible.

# Campus Cares Planner — Fresh Rebuild

This is a clean rebuild inspired by the old Campus Cares / 4-week planner, not a copy of the old tool.

## What changed

- Firebase is the source of truth after login.
- The app locks editing until Firebase finishes loading.
- localStorage is only an emergency cache, not the master save.
- Data is saved as real Firestore documents/subcollections instead of one giant JSON blob.
- Tasks use `times per week` only.
- Tasks are displayed in one column per location.
- “All locations” tasks appear in every location column with a clear badge.
- Only one task card expands at a time.
- Calendar assignments always store an explicit location.
- History snapshots are stored separately and can be restored.
- The top-right sync pill shows Loading, Ready, Unsaved, Saving, Saved, Failed, or Offline.

## Local launch

### Windows
Double-click `Start Local Server (Windows).bat`, then open the URL shown in the window.

### Mac
Double-click `Start Local Server (macOS).command`. If macOS blocks it, right-click it and choose Open.

### Linux / Chromebook terminal
Run:

```bash
bash start-server-linux.sh
```

Or directly:

```bash
python3 launch.py
```

## Firebase

Firebase config is in `src/config.js`.

The app currently uses the existing project config from the previous tool:

- projectId: `work-tool-72a03`

## Firestore data structure

```text
users/{uid}/planner/meta/main
users/{uid}/planner/locations/{locationId}
users/{uid}/planner/tasks/{taskId}
users/{uid}/planner/assignments/{assignmentId}
users/{uid}/planner/history/{snapshotId}
```

The app can also check the old legacy document:

```text
plannerStates/{uid}
```

If old data exists, it offers an import button.

## Suggested Firestore rules

Use rules appropriate for your project, but the rebuild expects signed-in users to read/write only their own planner path.

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/planner/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /plannerStates/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false;
    }
  }
}
```

## First run workflow

1. Sign in.
2. Wait for Firebase to finish loading.
3. If no new planner exists, choose Import old planner or Start new planner.
4. Add locations.
5. Add tasks.
6. Use Calendar to assign tasks to specific locations and days.
7. Watch the sync pill before closing the browser.

## Local Firebase auth troubleshooting

If sign-in shows this error:

```text
auth/requests-from-referer-http://localhost:8765-are-blocked
```

The app code is running, but Google/Firebase is blocking the local testing URL because the Firebase API key has website referrer restrictions.

Fix it in Google Cloud / Firebase API key settings by allowing these website referrers for local testing:

```text
http://localhost:8765/*
http://127.0.0.1:8765/*
```

You can also test from the deployed domain if that domain is already allowed. The 404 for `/favicon.ico` is harmless, but this zip includes a tiny favicon so it should no longer appear.


## Firestore path fix

This build stores the new planner at `users/{uid}/campusCaresPlanner/main` with subcollections under that document. This avoids invalid Firestore paths from the first rebuild draft.

## Complete rebuild update
This version restores the major useful functions from the old planner in the new Firebase-first architecture:
- 4-week visibility controls and copy-week actions
- day start location and start time
- travel entries
- unfinished task view
- tracked form-style tasks and bulk field addition
- print calendar and reset checkmarks
- editable location colors
- legacy import for day settings, travel, and tracked tasks


## v5 calendar changes
- Monday through Friday only.
- Five compact day columns fit on one desktop row.
- Selecting a task adds it immediately.
- Task selector appears below the scheduled items.
- Travel changes the active location for tasks added afterward.


## Version 6 calendar updates
- Calendar tasks use the selected location color as a border highlight.
- Location colors can be changed directly with a color picker in Locations.
- Each calendar item shows its calculated start time from the day's start time.
- Travel and lunch advance the running clock.
- Lunch is excluded from the daily task total.
- Each day shows the summed duration of task items.


## Version 9
- Live highlighted docking targets while dragging navigation.
- Stabilized Monday-Friday card widths and wrapping when tasks, travel, and lunch items are added.


## v10 fix
Task cards now retain the full content column even when a day has no start time selected.

## Version 11 navigation update
The floating, draggable, collapsible, and dockable navigation now works on every planner tab. Its floating position, collapsed state, and left/right/top docking choice persist while switching sections and across browser reloads.

## v13 calendar subtask workflow

Tasks with subtasks are now added to the calendar immediately without opening a picker. Copying a week copies the task structure but clears all selected subtasks. Click a calendar task afterward to assign or revise its subtasks for that specific week. Monthly subtasks remain unavailable elsewhere in the same four-week planner once assigned; weekly subtasks remain unavailable elsewhere in that same week and return in later weeks.


## Subtask duration update (v14)

- Each subtask inherits the main task duration when its time field is left blank.
- A subtask can set its own default duration.
- A subtask can set optional per-location duration overrides.
- Calendar time and daily task totals sum every selected subtask individually.
- Unassigned parent tasks continue to use the parent task duration until items are selected.


## v15 update
- Each weekly subtask has its own Times per week limit.
- Location-specific time rows only show locations that apply to the subtask.
- Location and time dropdowns close when clicking elsewhere.
