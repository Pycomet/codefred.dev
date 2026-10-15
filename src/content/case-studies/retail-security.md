---
slug: retail-security
title: Real-time theft detection across 50+ retail camera streams on unreliable power and internet
summary: Edge computer vision for a Nigerian retail chain that turned recorded CCTV into alerts within seconds.
area: computer-vision
client: Nigerian retail chain
role: Lead AI engineer
timeline: 8 weeks
order: 3
featured: 2
published: true
result:
  before: 2-48 hours
  after: under 30s
  label: to detect an incident
problem: Hundreds of cameras recorded footage nobody watched until after a theft. Streaming everything to the cloud was too expensive, and power and internet dropped often.
approach: Lightweight quantised YOLO models on small edge devices in each store, sending only alerts and short clips to a central FastAPI and Redis service, designed to keep working offline.
outcome: Incidents surface in under 30 seconds with 97% detection accuracy and an 8% false-alarm rate. Monthly theft losses fell from about $200k to under $30k, and storage costs from $5k to $800 a month.
stack: [Python, FastAPI, OpenCV, YOLO, Redis, PostgreSQL, Docker]
---

A retail chain in Nigeria needed to watch its stores for theft, empty shelves and safety issues in real time. Its CCTV only recorded footage, which nobody reviewed until after an incident had been reported.

## What I found

- **Reactive by design.** Incidents were found hours or days later.
- **Too many screens.** Guards couldn't watch dozens of feeds at once.
- **Bandwidth.** Streaming all footage to one place was expensive.
- **Storage.** Months of unwatched video filled storage budgets.

They needed alerts, not evidence.

## What I built

Instead of streaming raw video to the cloud, we brought the model to the cameras.

### Edge layer, in each store

A mini PC per location runs a quantised YOLO model over that store's cameras and sends only alerts and short clips upstream. If a device fails, processing falls back to the cloud.

### Central layer

A FastAPI service aggregates alerts, Redis streams events to a live dashboard over WebSockets, and PostgreSQL keeps the incident log.

### Making real time actually real time

- **Every third frame.** Security doesn't need 30 frames a second to catch a grab.
- **Regions of interest.** Only checkouts, entrances and high-value aisles are analysed.
- **Motion first.** Static frames never reach the model.
- **INT8 quantisation.** About 3x faster for under 2% accuracy loss.
- **Batching** frames across cameras for GPU efficiency.

### Built for local conditions

Edge devices sit on UPS with six hours of battery and resume on their own when power returns. Alerts queue and retry when the connection drops, clips are compressed with H.265, and models fall back to CPU when no GPU is available.

```python
model = YOLO("yolov8n-int8.pt")  # nano model, INT8 quantised

def process_stream(rtsp_url: str, camera_id: str):
    cap = cv2.VideoCapture(rtsp_url)
    frame_count = 0
    while cap.isOpened():
        ok, frame = cap.read()
        if not ok:
            break
        frame_count += 1
        if frame_count % 3 or not has_motion(frame):
            continue  # skip cheaply before running the model
        for detection in model(frame, conf=0.6):
            if is_suspicious(detection):
                publish_alert(camera_id, detection, thumbnail(frame))
```

## The numbers

Piloted in 12 stores, then rolled out across the chain.

| | Before | After |
| --- | --- | --- |
| Time to detect an incident | 2-48 hours | under 30 seconds |
| Monthly loss from theft | about $200k | under $30k |
| Storage cost | $5k/month | $800/month |
| False alarms | n/a | 8% |

In the first quarter the system flagged more than 40 theft attempts and helped identify internal theft. Foot-traffic data also fed into store layout changes.

## What carries over

Running YOLO on a laptop is easy. Running it on dozens of cameras with spotty internet and frequent outages is systems engineering: design for failure, and accept 95% accuracy at ten times the speed when that's what the job needs.
