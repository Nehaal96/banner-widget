import {
	LitElement,
	html,
	css,
} from "https://unpkg.com/lit@2.8.0/index.js?module";

class VoucherBanner extends LitElement {
	static styles = css`
		:host {
			display: block;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
				Ubuntu, Cantarell, "Open Sans", sans-serif;
			--primary-color: #9b87f5;
			--secondary-color: #8b5cf6;
			--accent-color: #d946ef;
			--success-color: #10b981;
			--text-color: #1e293b;
			--light-bg: #e5deff;
			--white: #ffffff;
		}

		.banner-container {
			max-width: 500px;
			margin: 20px auto;
			border-radius: 16px;
			overflow: hidden;
			box-shadow: 0 10px 25px rgba(155, 135, 245, 0.15);
			background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
		}

		.banner-header {
			background: linear-gradient(
				135deg,
				var(--primary-color),
				var(--secondary-color)
			);
			color: var(--white);
			padding: 10px 25px;
			text-align: center;
			position: relative;
		}

		.sparkle {
			position: absolute;
			width: 20px;
			height: 20px;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3v18M3 12h18'/%3E%3C/svg%3E");
			background-repeat: no-repeat;
			opacity: 0.6;
			animation: sparkle 2s infinite;
		}

		.sparkle:nth-child(1) {
			top: 15px;
			left: 20px;
			animation-delay: 0s;
		}

		.sparkle:nth-child(2) {
			top: 25px;
			right: 30px;
			animation-delay: 0.3s;
		}

		.sparkle:nth-child(3) {
			bottom: 15px;
			left: 40px;
			animation-delay: 0.6s;
		}

		@keyframes sparkle {
			0%,
			100% {
				opacity: 0.6;
				transform: scale(1);
			}
			50% {
				opacity: 1;
				transform: scale(1.2);
			}
		}

		.banner-title {
			font-size: 20px;
			font-weight: 700;
			margin: 0 0 5px 0;
			letter-spacing: 0.5px;
		}

		.discount-value {
			font-size: 32px;
			font-weight: 800;
			margin: 5px 0;
		}

		.banner-body {
			padding: 20px 25px;
			position: relative;
		}

		.description {
			color: var(--text-color);
			font-size: 16px;
			line-height: 1.5;
			margin: 0 0 20px 0;
			text-align: center;
		}

		.code-container {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 15px 0;
			position: relative;
		}

		.code {
			background-color: var(--light-bg);
			border: 2px dashed var(--primary-color);
			border-radius: 8px;
			font-family: monospace;
			font-size: 18px;
			font-weight: 700;
			letter-spacing: 1px;
			padding: 12px 20px;
			position: relative;
			color: var(--secondary-color);
			min-width: 180px;
			text-align: center;
			transition: all 0.2s ease;
		}

		.copy-button {
			background-color: var(--primary-color);
			border: none;
			border-radius: 8px;
			color: var(--white);
			cursor: pointer;
			font-size: 15px;
			font-weight: 600;
			margin-left: 10px;
			padding: 12px 15px;
			transition: all 0.2s ease;
			display: flex;
			align-items: center;
			gap: 5px;
		}

		.copy-button:hover {
			background-color: var(--secondary-color);
			transform: translateY(-2px);
		}

		.copy-button:active {
			transform: translateY(0);
		}

		.copy-icon,
		.check-icon {
			width: 16px;
			height: 16px;
		}

		.expiry {
			color: #64748b;
			font-size: 14px;
			text-align: center;
			margin-top: 15px;
		}

		/* Animation for copy success */
		@keyframes pulse {
			0% {
				transform: scale(1);
			}
			50% {
				transform: scale(1.05);
			}
			100% {
				transform: scale(1);
			}
		}

		.pulse {
			animation: pulse 0.3s ease-in-out;
		}

		.success {
			background-color: var(--success-color);
		}

		.shimmer {
			background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, 0.5) 50%,
				rgba(255, 255, 255, 0) 100%
			);
			background-size: 200% 100%;
			animation: shimmer 2s infinite;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
		}

		@keyframes shimmer {
			0% {
				background-position: -200% 0;
			}
			100% {
				background-position: 200% 0;
			}
		}
	`;

	static properties = {
		discountValue: { type: String },
		discountCode: { type: String },
		expiryDays: { type: Number },
		copied: { type: Boolean },
		title: { type: String },
		description: { type: String },
	};

	constructor() {
		super();
		this.discountValue = "20% OFF";
		this.discountCode = "THANKYOU20";
		this.expiryDays = 7;
		this.copied = false;
		this.title = "Thank You for Your Purchase!";
		this.description = "Use this exclusive discount on your next order.";
	}

	copyCode() {
		navigator.clipboard.writeText(this.discountCode);
		this.copied = true;

		// Add pulse animation
		const codeElement = this.shadowRoot.querySelector(".code");
		codeElement.classList.add("pulse");

		// Reset after animation completes
		setTimeout(() => {
			codeElement.classList.remove("pulse");
		}, 300);

		// Reset copied state after 3 seconds
		setTimeout(() => {
			this.copied = false;
		}, 3000);
	}

	getExpiryDate() {
		const date = new Date();
		date.setDate(date.getDate() + this.expiryDays);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	render() {
		return html`
			<div class="banner-container">
				<div class="banner-header">
					<div class="sparkle"></div>
					<div class="sparkle"></div>
					<div class="sparkle"></div>
					<h3 class="banner-title">${this.title} - ${this.discountValue}</h3>
				</div>
				<div class="banner-body">
					<p class="description">${this.description}</p>
					<div class="code-container">
						<div class="code">
							${this.discountCode}
							<div class="shimmer"></div>
						</div>
						<button
							class="copy-button ${this.copied ? "success" : ""}"
							@click="${this.copyCode}"
						>
							${this.copied
								? html`<svg
											class="check-icon"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path d="M20 6L9 17l-5-5" /></svg
										>Copied!`
								: html`<svg
											class="copy-icon"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
											<path
												d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
											/></svg
										>Copy`}
						</button>
					</div>

					<p class="expiry">Valid until: ${this.getExpiryDate()}</p>
				</div>
			</div>
		`;
	}
}

customElements.define("voucher-display", VoucherBanner);
