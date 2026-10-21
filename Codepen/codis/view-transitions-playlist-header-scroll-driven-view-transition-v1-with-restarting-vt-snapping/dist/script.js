// This version:
// - Same as V1 (https://codepen.io/bramus/pen/bGZWwxJ)
//   - Starts a VT that remains active
//   - Adds a scroll listener that updates the VT’s animations based on the scroll position via scrollTop
//   - Re-initializes everything on resize, as ongoing VTs get cancelled on resize
// - Only creates the VT when in range


const go = () => {
	let activeViewTransition = null;
	let activeAnimations = [];
	
	const $card = document.querySelector('.card');
	const $tracks = document.querySelector('.tracks');
	
	const cardHeight = CSS.px($card.offsetHeight);
	const cardWidth = CSS.px($card.offsetWidth);
	const cardHeightSmall = CSS.px(120); // @TODO: Make this dynamic
	
	document.documentElement.style.setProperty('--card-large', cardHeight.toString());
	document.documentElement.style.setProperty('--card-small', cardHeightSmall.toString());

	// Determine things to track
	const scrollTimelineAxis = 'y';
	let scrollTimelineStart = CSS.px(0);
	let scrollTimelineEnd = cardHeight.sub(cardHeightSmall);

	// Make the card faux-sticky, and offset the tracks
	$card.style.width = cardWidth;
	$card.style.position = 'fixed';
	$card.style.zIndex = '1';
	$card.style.top = '0';
	$tracks.style.paddingTop = cardHeight;
	
	// The base duration of the animation
	// Same as --vt-base-duration in the CSS
	const baseDuration = 1000;
		
	const scrollDistance = scrollTimelineEnd.sub(scrollTimelineStart);
	
	// Method that starts the View Transition
	const startViewTransition = async () => {
		// Determine if we are going back or not
		const isReverse = document.querySelector('.small') ? true : false;
				
		// Start the View Transition
		activeViewTransition = document.startViewTransition(() => {
			document.querySelector('.card').classList.toggle('small');
		});
		await activeViewTransition.ready;
		
		// Immediately pause all animations linked to it
		activeAnimations = document.getAnimations().filter((anim) =>
			anim.effect.target === document.documentElement && anim.effect.pseudoElement?.startsWith("::view-transition")
		);
		for (const anim of activeAnimations) {
			if (isReverse) anim.reverse();
			anim.pause();
		}
		
		// Make sure animations their currentTime is up-to-date
		updateAnimations();

		// The VT finishes when all the animations have reached 100%,
		// i.e. when having scroll past the scrollTimelineEnd offset.
		await activeViewTransition.finished;

		// Make sure the card has the correct end state
		if (document.documentElement.scrollTop > scrollTimelineStart.value) {
			document.querySelector('.card').classList.add('small');
		} else {
			document.querySelector('.card').classList.remove('small');
		}

		// Clear activeViewTransition so that scroll listener can create a new VT once in the correct range
		activeViewTransition = null;
	}
	
	// Method that updates the tracked animations
	const updateAnimations = () => {
		// No need to do anything when there are no animations being tracked
		if (!activeAnimations.length) return;
		
		const scrollProgress = (document.documentElement.scrollTop - scrollTimelineStart.value) / scrollDistance.value;
	
		// Determine time based on dragging delta
		// Clamp it between 0 and baseDuration.
		const currentTime = Math.max(0, Math.min(baseDuration, scrollProgress * baseDuration));

		for (const animation of activeAnimations) {
			// Take playbackRate into account
			if (animation.playbackRate === -1) {
				animation.currentTime = baseDuration - currentTime;
			} else {
				animation.currentTime = currentTime;
			}
		}
		
	}
	
	const checkScrollPosition = async () => {
		// In-range: start or update the VT
		if (
			(document.documentElement.scrollTop > scrollTimelineStart.value) && 
			(document.documentElement.scrollTop < scrollTimelineEnd.value)
		) {
			if (!activeViewTransition) {
				startViewTransition();
			} else {
				updateAnimations();
			}
		}
		
		// Outside of the range: clean up the VT
		else {

			// Explicitly clear the VT when outside the range.
			// This because when undershooting the scrollTimelineStart offset, the VT doesn’t finish automatically
			// (When overshooting the scrollTimelineEnd offset it does cancel automatically)
			if (activeViewTransition) {
				activeViewTransition.skipTransition();
				activeViewTransition = null;
			}
						
			// Make sure the card has the correct class depending on the scroll offset
			if (document.documentElement.scrollTop >= scrollTimelineEnd.value) {
				document.querySelector('.card:not(.small)')?.classList.add('small');
			} else {
				document.querySelector('.card.small')?.classList.remove('small');
			}
		}
	}
		
	// Add a scroll listener, and update the viewTransition based on the active offset
	window.addEventListener('scroll', checkScrollPosition);
	
	// On resize View Transitions get cancelled, so we need to make sure we’re at the correct state again
	// @TODO: Debounce this
	window.addEventListener('resize', checkScrollPosition);
	
	// Make sure the card has the correct class when already at the specific offset
	checkScrollPosition();
}

window.addEventListener('load', () => {
	go();
});