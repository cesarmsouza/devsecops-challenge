import json, urllib.request, urllib.error

def handler(event, context):
    if isinstance(event, str):
        try:
            event = json.loads(event)
        except Exception:
            event = {}

    url = (event or {}).get("url")
    meta = (event or {}).get("meta", {})

    if not url:
        return {"ok": False, "error": "missing url in event", "event": event}

    try:
        req = urllib.request.Request(url, method="GET", headers={"User-Agent": "devsecops-notifier"})
        with urllib.request.urlopen(req, timeout=8) as resp:
            body = resp.read()
            status = resp.getcode()
            preview = body[:200].decode("utf-8", errors="ignore")
        return {"ok": True, "status": status, "url": url, "meta": meta, "body_preview": preview}
    except urllib.error.HTTPError as e:
        return {"ok": False, "status": e.code, "url": url, "meta": meta, "error": str(e)}
    except Exception as e:
        return {"ok": False, "url": url, "meta": meta, "error": str(e)}

