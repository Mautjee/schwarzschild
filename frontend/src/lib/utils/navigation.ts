import { router } from '$lib/store/router';

/**
 * Navigate to home page
 */
export function navigateHome(): void {
	router.navigate('home');
}

/**
 * Navigate to send page
 */
export function navigateSend(): void {
	router.navigate('send');
}

/**
 * Navigate to receive page
 */
export function navigateReceive(): void {
	router.navigate('receive');
}

/**
 * Reset scroll position on navigation
 */
export function resetScroll(): void {
	window.scrollTo(0, 0);
}
