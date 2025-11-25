<script lang="ts">
	import CaseStudyHero from '$lib/components/case-study/CaseStudyHero.svelte';
	import MetricsGrid from '$lib/components/case-study/MetricsGrid.svelte';
	import ContentSection from '$lib/components/case-study/ContentSection.svelte';
	import CodeBlock from '$lib/components/case-study/CodeBlock.svelte';
	import Testimonial from '$lib/components/case-study/Testimonial.svelte';
	import ComparisonTable from '$lib/components/case-study/ComparisonTable.svelte';
	import CalloutBox from '$lib/components/case-study/CalloutBox.svelte';
	import CaseStudyCTA from '$lib/components/case-study/CaseStudyCTA.svelte';
	import SEO from '$components/SEO.svelte';
</script>

<SEO
	title="Retail Security Computer Vision Case Study | 50+ Cameras | Codefred"
	description="Built a distributed computer vision system processing 50+ RTSP streams in real-time with 97% accuracy, preventing $2M+ in losses for Nigerian retail chain."
	canonical="https://codefred.dev/case-studies/retail-security"
/>

<CaseStudyHero
	title="Real-Time Computer Vision: 50+ Camera Streams Processing"
	client="Nigerian Retail Chain"
	role="Lead AI Engineer"
	timeline="8 Weeks"
	stack={['Python', 'FastAPI', 'OpenCV', 'YOLO', 'Redis', 'WebRTC', 'Docker']}
/>

<div class="container-custom max-w-5xl py-12">
	<ContentSection title="The Challenge">
		<p>
			A major retail chain in Nigeria needed to monitor 50+ stores for security threats, inventory tracking, and customer analytics - all in real-time. Their existing CCTV system was just recording footage that nobody watched until after incidents occurred.
		</p>
	</ContentSection>

	<MetricsGrid
		metrics={[
			{ value: '50+', label: 'Concurrent Streams', highlight: true },
			{ value: '97%', label: 'Accuracy Rate', highlight: true },
			{ value: '$2M+', label: 'Loss Prevention', highlight: true }
		]}
	/>

	<ContentSection>
		<p class="text-lg text-text-primary font-semibold">
			Built a distributed computer vision system that processes 50+ RTSP camera streams simultaneously, achieving 97% detection accuracy and preventing over $2M in losses within the first year.
		</p>
	</ContentSection>

	<ContentSection title="The Problem: Reactive Security is Expensive Security">
		<p>
			The client had hundreds of cameras across their stores, but they were essentially useless for prevention. Security footage was only reviewed after theft or incidents were reported - by then, it was too late.
		</p>

		<CalloutBox type="warning" title="Pain Points">
			<ul>
				<li><strong>Reactive Response:</strong> Incidents were discovered hours or days later</li>
				<li><strong>Human Limitations:</strong> Security guards couldn't monitor 50+ screens effectively</li>
				<li><strong>Bandwidth Issues:</strong> Streaming all footage to a central location was costly</li>
				<li><strong>Storage Costs:</strong> Months of unused footage eating up storage budgets</li>
			</ul>
		</CalloutBox>

		<p>They needed real-time alerts, not historical evidence.</p>
	</ContentSection>

	<ContentSection title="The Solution: Edge Processing with Central Coordination" variant="highlight">
		<p>
			Instead of streaming raw video to the cloud, we brought the AI to the cameras.
		</p>

		<h3>Architecture: Distributed Intelligence</h3>

		<div class="grid md:grid-cols-2 gap-6 my-6">
			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">Edge Layer (At Each Store)</h4>
				<ul class="space-y-2 text-sm">
					<li>Raspberry Pi 4 or NUC mini PC running lightweight YOLO models</li>
					<li>Process local camera streams (4-8 cameras per location)</li>
					<li>Only send alerts + short clips to central server</li>
					<li>Fallback to cloud processing if edge device fails</li>
				</ul>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">Central Layer (Cloud)</h4>
				<ul class="space-y-2 text-sm">
					<li>FastAPI backend for alert aggregation</li>
					<li>Redis for real-time event streaming</li>
					<li>PostgreSQL for incident logging</li>
					<li>WebSocket connections for live dashboard</li>
				</ul>
			</div>
		</div>

		<CalloutBox type="info" title="Detection Targets">
			<ol>
				<li>Suspicious behavior patterns (loitering, grab-and-run)</li>
				<li>Inventory monitoring (empty shelves, stock movement)</li>
				<li>Safety compliance (PPE detection, restricted area access)</li>
				<li>Customer analytics (foot traffic, queue length)</li>
			</ol>
		</CalloutBox>

		<h3>Optimization: Making Real-Time Actually Real-Time</h3>
		<p>
			Processing 50+ HD video streams in real-time is computationally expensive. Here's how we made it work:
		</p>

		<CalloutBox type="success" title="The Fixes">
			<ul>
				<li><strong>Frame Skipping:</strong> Process every 3rd frame (human eye can't tell the difference at 10fps vs 30fps for security)</li>
				<li><strong>Region of Interest:</strong> Only analyze specific zones (checkout counters, entrances, high-value aisles)</li>
				<li><strong>Motion Detection First:</strong> Skip AI inference on static frames</li>
				<li><strong>Model Quantization:</strong> INT8 quantized YOLO models run 3x faster with &lt;2% accuracy loss</li>
				<li><strong>Batch Processing:</strong> Group frames from multiple cameras into batches for GPU efficiency</li>
			</ul>
		</CalloutBox>
	</ContentSection>

	<ContentSection title="The Technical Stack">
		<p>Here's the simplified edge processing pipeline:</p>
	</ContentSection>

	<CodeBlock
		language="python"
		title="Edge Processing Pipeline"
		code={`import cv2
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
                )`}
	/>

	<ContentSection title="Handling Nigerian Infrastructure Challenges">
		<p>
			This wasn't Silicon Valley with perfect fiber internet. We had to design for:
		</p>

		<div class="grid md:grid-cols-3 gap-6 my-6">
			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">⚡ Power Outages</h4>
				<ul class="space-y-2 text-sm">
					<li>Edge devices on UPS (6-hour battery backup)</li>
					<li>Auto-resume on power restoration</li>
					<li>Local storage buffer for offline periods</li>
				</ul>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">📡 Unreliable Internet</h4>
				<ul class="space-y-2 text-sm">
					<li>Alert queue with retry logic</li>
					<li>Compress video clips aggressively (H.265)</li>
					<li>Graceful degradation when cloud is unreachable</li>
				</ul>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">💻 Hardware Constraints</h4>
				<ul class="space-y-2 text-sm">
					<li>Run models on CPU when GPU unavailable</li>
					<li>Dynamic quality adjustment based on available resources</li>
					<li>Local storage on SD cards with automatic cleanup</li>
				</ul>
			</div>
		</div>
	</ContentSection>

	<ContentSection title="The Outcome">
		<p>
			Deployed across 12 stores in the pilot, then scaled to 50+ locations.
		</p>
	</ContentSection>

	<ComparisonTable
		rows={[
			{ metric: 'Incident Detection Time', before: '2-48 hours', after: '<30 seconds' },
			{ metric: 'False Alarm Rate', before: 'N/A', after: '8%' },
			{ metric: 'Monthly Loss from Theft', before: '~$200K', after: '<$30K' },
			{ metric: 'Storage Costs', before: '$5K/month', after: '$800/month' }
		]}
	/>

	<CalloutBox type="success" title="Real Impact">
		<ul>
			<li>Prevented 40+ theft attempts in first quarter</li>
			<li>Identified 3 employees involved in internal theft</li>
			<li>Optimized store layouts based on foot traffic data</li>
			<li>Reduced insurance premiums by 15%</li>
		</ul>
	</CalloutBox>

	<Testimonial
		quote="The system paid for itself in the first 3 months. Now we catch theft as it happens, not after we've lost the inventory."
		author="Security Director"
	/>

	<ContentSection title="The Lesson" variant="dark">
		<p>
			Computer vision isn't just about accuracy - it's about architecture. Running YOLO on a laptop is easy. Running it on 50 cameras with spotty internet and frequent power outages across Nigeria? That's systems engineering.
		</p>

		<CalloutBox type="tip" title="Key Takeaways">
			<ul>
				<li><strong>Edge processing beats cloud</strong> for latency-critical applications</li>
				<li><strong>Design for failure</strong> (because infrastructure will fail)</li>
				<li><strong>Optimize ruthlessly</strong> (you don't always need 99% accuracy - 95% at 10x speed is often better)</li>
				<li><strong>Real-world deployment</strong> is 20% ML, 80% DevOps</li>
			</ul>
		</CalloutBox>
	</ContentSection>

	<CaseStudyCTA />
</div>
