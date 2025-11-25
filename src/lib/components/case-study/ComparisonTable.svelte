<script lang="ts">
	interface Row {
		metric: string;
		before: string;
		after: string;
		change?: string;
	}

	interface Props {
		rows: Row[];
		title?: string;
	}

	let { rows, title = 'Results' }: Props = $props();
</script>

<div class="my-12">
	{#if title}
		<h3 class="text-2xl font-display font-bold text-text-primary mb-6">{title}</h3>
	{/if}
	
	<div class="overflow-x-auto rounded-xl border border-bg-accent">
		<table class="w-full">
			<thead class="bg-bg-secondary border-b border-bg-accent">
				<tr>
					<th class="px-6 py-4 text-left text-sm font-semibold text-brand-primary uppercase tracking-wide">
						Metric
					</th>
					<th class="px-6 py-4 text-left text-sm font-semibold text-brand-primary uppercase tracking-wide">
						Before
					</th>
					<th class="px-6 py-4 text-left text-sm font-semibold text-brand-primary uppercase tracking-wide">
						After
					</th>
					{#if rows.some(r => r.change)}
						<th class="px-6 py-4 text-left text-sm font-semibold text-brand-primary uppercase tracking-wide">
							Change
						</th>
					{/if}
				</tr>
			</thead>
			<tbody class="bg-bg-primary divide-y divide-bg-accent">
				{#each rows as row}
					<tr class="hover:bg-bg-secondary/50 transition-colors">
						<td class="px-6 py-4 text-text-primary font-medium">
							{row.metric}
						</td>
						<td class="px-6 py-4 text-text-secondary font-mono">
							{row.before}
						</td>
						<td class="px-6 py-4 text-brand-primary font-mono font-semibold">
							{row.after}
						</td>
						{#if row.change}
							<td class="px-6 py-4">
								<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
									{row.change}
								</span>
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	table {
		border-collapse: collapse;
	}
</style>

