import Link from "next/link";

export default function SubscriberCard() {
	return (
		<section>
			<div>
				<h4>See all products</h4>
				<p style={{ fontSize: '1rem' }}>Go back to see the entire catalogue.</p>
				<Link href='/products' className="primary button">
					Back to Products
				</Link>
			</div>
		</section>
	);
}