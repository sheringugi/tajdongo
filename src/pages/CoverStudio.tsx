import { useCallback, useState } from "react";
import JSZip from "jszip";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { generateCover, CoverStyle, STYLE_LABELS } from "@/lib/coverGenerator";
import { generateVideo, VideoStyle, VIDEO_STYLE_LABELS } from "@/lib/videoGenerator";

type PhotoItem = {
  id: string;
  file: File;
  name: string;
  previews: Partial<Record<CoverStyle, string>>;
  blobs: Partial<Record<CoverStyle, Blob>>;
  videoUrl?: string;
  videoBlob?: Blob;
  videoStyle?: VideoStyle;
  videoBusy?: boolean;
};

const ALL_STYLES: CoverStyle[] = ["torn", "banner", "split"];
const ALL_VIDEO_STYLES: VideoStyle[] = ["kenburns", "reveal", "pulse"];

const CoverStudio = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [subtitle, setSubtitle] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<CoverStyle[]>(ALL_STYLES);
  const [busy, setBusy] = useState(false);

  const onFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const next: PhotoItem[] = Array.from(files).map((f) => ({
      id: `${Date.now()}-${f.name}-${Math.random().toString(36).slice(2, 7)}`,
      file: f,
      name: f.name.replace(/\.[^.]+$/, ""),
      previews: {},
      blobs: {},
    }));
    setItems((prev) => [...prev, ...next]);
  }, []);

  const runGenerate = async () => {
    if (items.length === 0) {
      toast({ title: "Upload at least one photo first" });
      return;
    }
    if (selectedStyles.length === 0) {
      toast({ title: "Pick at least one style" });
      return;
    }
    setBusy(true);
    try {
      const updated = await Promise.all(
        items.map(async (it) => {
          const previews: PhotoItem["previews"] = { ...it.previews };
          const blobs: PhotoItem["blobs"] = { ...it.blobs };
          for (const s of selectedStyles) {
            const blob = await generateCover(it.file, s, subtitle || undefined);
            blobs[s] = blob;
            if (previews[s]) URL.revokeObjectURL(previews[s]!);
            previews[s] = URL.createObjectURL(blob);
          }
          return { ...it, previews, blobs };
        })
      );
      setItems(updated);
      toast({ title: `Generated ${updated.length * selectedStyles.length} covers` });
    } catch (e) {
      console.error(e);
      toast({ title: "Generation failed", description: String(e) });
    } finally {
      setBusy(false);
    }
  };

  const downloadOne = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    let count = 0;
    for (const it of items) {
      for (const s of ALL_STYLES) {
        const b = it.blobs[s];
        if (!b) continue;
        zip.file(`${it.name}__${s}.png`, b);
        count++;
      }
    }
    if (count === 0) {
      toast({ title: "Nothing generated yet" });
      return;
    }
    const content = await zip.generateAsync({ type: "blob" });
    downloadOne(content, `tajdo-on-mission-covers.zip`);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it) Object.values(it.previews).forEach((u) => u && URL.revokeObjectURL(u));
      return prev.filter((x) => x.id !== id);
    });
  };

  const toggleStyle = (s: CoverStyle) => {
    setSelectedStyles((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <Layout>
      <section className="section-padding py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm tracking-[0.25em] uppercase text-primary mb-4">Content Studio</p>
            <h1 className="heading-hero mb-4">Cover Generator</h1>
            <p className="body-text">
              Upload your photos and instantly get branded "tajdo on mission" Instagram covers
              (1080×1350) in three on-brand styles.
            </p>
          </div>

          {/* Controls */}
          <div className="bg-secondary rounded-lg p-8 mb-10 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 tracking-wide uppercase">
                Upload photos
              </label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onFiles(e.target.files)}
              />
              <p className="text-xs text-muted-foreground mt-2">
                You can pick many at once. Add more anytime.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 tracking-wide uppercase">
                Subtitle (optional)
              </label>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. ZANZIBAR · 2026   or   care · protect · restore"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3 tracking-wide uppercase">
                Styles
              </label>
              <div className="flex flex-wrap gap-3">
                {ALL_STYLES.map((s) => {
                  const active = selectedStyles.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleStyle(s)}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                        active
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent border-foreground/30 text-foreground hover:border-foreground"
                      }`}
                    >
                      {STYLE_LABELS[s]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button onClick={runGenerate} disabled={busy || items.length === 0}>
                {busy ? "Generating…" : `Generate covers (${items.length} × ${selectedStyles.length})`}
              </Button>
              <Button variant="outline" onClick={downloadAll} disabled={items.length === 0}>
                Download all as ZIP
              </Button>
            </div>
          </div>

          {/* Results grid */}
          <div className="space-y-12">
            {items.map((it) => (
              <div key={it.id} className="border-t border-foreground/10 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl italic">{it.name}</h3>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ALL_STYLES.map((s) => {
                    const url = it.previews[s];
                    return (
                      <div key={s} className="space-y-3">
                        <div className="aspect-[4/5] bg-secondary rounded overflow-hidden flex items-center justify-center">
                          {url ? (
                            <img src={url} alt={`${it.name} ${s}`} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs uppercase tracking-widest text-muted-foreground">
                              {STYLE_LABELS[s]}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-widest">{STYLE_LABELS[s]}</span>
                          {it.blobs[s] && (
                            <button
                              onClick={() => downloadOne(it.blobs[s]!, `${it.name}__${s}.png`)}
                              className="text-xs uppercase tracking-widest text-primary hover:underline"
                            >
                              Download
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No photos yet — upload above to get started.
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CoverStudio;
