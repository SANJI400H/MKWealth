type Listener = (playing: boolean) => void;

let holders = 0;
const listeners = new Set<Listener>();

function emit() {
  const playing = holders > 0;
  listeners.forEach((listener) => listener(playing));
}

/** Keep the nav clear while a cinema clip is on screen. Call the returned release when it ends. */
export function holdNavForVideo() {
  holders += 1;
  emit();
  return () => {
    holders = Math.max(0, holders - 1);
    emit();
  };
}

export function subscribeNavVideo(listener: Listener) {
  listeners.add(listener);
  listener(holders > 0);
  return () => {
    listeners.delete(listener);
  };
}
