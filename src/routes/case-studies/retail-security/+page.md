---
layout: caseStudy
title: "Real-Time Computer Vision: 50+ Camera Streams Processing"
client: "Nigerian Retail Chain"
role: "Lead AI Engineer"
timeline: "8 Weeks"
stack: "Python, FastAPI, OpenCV, YOLO, Redis, WebRTC"
date: "2024"
featured: true
---

# Real-Time Computer Vision: 50+ Camera Streams Processing

**Client:** Nigerian Retail Chain
**Role:** Lead AI Engineer
**Timeline:** 8 Weeks
**Stack:** Python, FastAPI, OpenCV, YOLO, Redis, WebRTC

## The Challenge

A major retail chain in Nigeria needed to monitor 50+ stores for security threats, inventory tracking, and customer analytics - all in real-time. Their existing CCTV system was just recording footage that nobody watched until after incidents occurred.

<div class="metrics">
<div class="metric">
<div class="metric-value">50+</div>
<div class="metric-label">Concurrent Streams</div>
</div>
<div class="metric">
<div class="metric-value">97%</div>
<div class="metric-label">Accuracy Rate</div>
</div>
<div class="metric">
<div class="metric-value">$2M+</div>
<div class="metric-label">Loss Prevention</div>
</div>
</div>

**The Result:** Built a distributed computer vision system that processes 50+ RTSP camera streams simultaneously, achieving 97% detection accuracy and preventing over $2M in losses within the first year.

## The Problem: Reactive Security is Expensive Security

The client had hundreds of cameras across their stores, but they were essentially useless for prevention. Security footage was only reviewed after theft or incidents were reported - by then, it was too late.

**Pain Points:**
- **Reactive Response:** Incidents were discovered hours or days later
- **Human Limitations:** Security guards couldn't monitor 50+ screens effectively
- **Bandwidth Issues:** Streaming all footage to a central location was costly
- **Storage Costs:** Months of unused footage eating up storage budgets

They needed real-time alerts, not historical evidence.

## The Solution: Edge Processing with Central Coordination

Instead of streaming raw video to the cloud, we brought the AI to the cameras.

### Architecture: Distributed Intelligence

**Edge Layer (At Each Store):**
- Raspberry Pi 4 or NUC mini PC running lightweight YOLO models
- Process local camera streams (4-8 cameras per location)
- Only send alerts + short clips to central server
- Fallback to cloud processing if edge device fails

**Central Layer (Cloud):**
- FastAPI backend for alert aggregation
- Redis for real-time event streaming
- PostgreSQL for incident logging
- WebSocket connections for live dashboard

**Detection Targets:**
1. Suspicious behavior patterns (loitering, grab-and-run)
2. Inventory monitoring (empty shelves, stock movement)
3. Safety compliance (PPE detection, restricted area access)
4. Customer analytics (foot traffic, queue length)

### Optimization: Making Real-Time Actually Real-Time

**Challenge:** Processing 50+ HD video streams in real-time is computationally expensive.

**The Fixes:**

1. **Frame Skipping:** Process every 3rd frame (human eye can't tell the difference at 10fps vs 30fps for security)
2. **Region of Interest:** Only analyze specific zones (checkout counters, entrances, high-value aisles)
3. **Motion Detection First:** Skip AI inference on static frames
4. **Model Quantization:** INT8 quantized YOLO models run 3x faster with &lt;2% accuracy loss
5. **Batch Processing:** Group frames from multiple cameras into batches for GPU efficiency

## The Technical Stack

```python
# Simplified edge processing pipeline

import cv2
from ultralytics import YOLO
import redis

# Load optimized model
model = YOLO("yolov8n-int8.pt")  # Nano model, INT8 quantized
redis_client = redis.Redis(host="central-server")

def process_stream(rtsp_url: str, camera_id: str):
    cap = cv2.VideoCapture(rtsp_url)
    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Process every 3rd frame
        frame_count += 1
        if frame_count % 3 != 0:
            continue

        # Motion detection first (cheap)
        if not has_motion(frame):
            continue

        # AI inference (expensive)
        results = model(frame, conf=0.6)

        # Check for alerts
        for detection in results:
            if is_suspicious(detection):
                # Send alert + thumbnail to central
                redis_client.publish(
                    "alerts",
                    {
                        "camera": camera_id,
                        "type": detection.class_name,
                        "confidence": detection.conf,
                        "timestamp": time.time(),
                        "image": encode_thumbnail(frame)
                    }
                )
```

## Handling Nigerian Infrastructure Challenges

This wasn't Silicon Valley with perfect fiber internet. We had to design for:

**Power Outages:**
- Edge devices on UPS (6-hour battery backup)
- Auto-resume on power restoration
- Local storage buffer for offline periods

**Unreliable Internet:**
- Alert queue with retry logic
- Compress video clips aggressively (H.265)
- Graceful degradation when cloud is unreachable

**Hardware Constraints:**
- Run models on CPU when GPU unavailable
- Dynamic quality adjustment based on available resources
- Local storage on SD cards with automatic cleanup

## The Outcome

Deployed across 12 stores in the pilot, then scaled to 50+ locations.

| Metric | Before | After |
|--------|--------|-------|
| Incident Detection Time | 2-48 hours | &lt;30 seconds |
| False Alarm Rate | N/A | 8% |
| Monthly Loss from Theft | ~$200K | &lt;$30K |
| Storage Costs | $5K/month | $800/month |

**Real Impact:**
- Prevented 40+ theft attempts in first quarter
- Identified 3 employees involved in internal theft
- Optimized store layouts based on foot traffic data
- Reduced insurance premiums by 15%

> "The system paid for itself in the first 3 months. Now we catch theft as it happens, not after we've lost the inventory."
> — Security Director

## The Lesson

Computer vision isn't just about accuracy - it's about architecture. Running YOLO on a laptop is easy. Running it on 50 cameras with spotty internet and frequent power outages across Nigeria? That's systems engineering.

**Key Takeaways:**
- Edge processing beats cloud for latency-critical applications
- Design for failure (because infrastructure will fail)
- Optimize ruthlessly (you don't always need 99% accuracy - 95% at 10x speed is often better)
- Real-world deployment is 20% ML, 80% DevOps
