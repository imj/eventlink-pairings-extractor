declare const browser: typeof chrome;

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

export default function Popup() {
  async function handleExtractClick() {
    const [tab] = await browserAPI.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab.id) {
      browserAPI.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
      });
    }
    window.close();
  }

  return (
    <div className="min-w-64 font-sans">
      <button
        id="extractBtn"
        className="p-2 w-full"
        onClick={handleExtractClick}
      >
        Estrai & Copia Pairings
      </button>
      <div id="status" className="mt-2.5 text-sm text-green-600"></div>
    </div>
  );
}
