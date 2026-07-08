from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def banner():
    img = Image.new("RGB", (1200, 520), "#f6f8fb")
    d = ImageDraw.Draw(img)

    # Background bands.
    d.rectangle((0, 0, 1200, 520), fill="#f6f8fb")
    d.polygon([(0, 0), (450, 0), (250, 520), (0, 520)], fill="#eaf2ff")
    d.polygon([(820, 0), (1200, 0), (1200, 520), (610, 520)], fill="#eef7f2")

    # Main laptop panel.
    rounded(d, (100, 96, 760, 420), 26, "#ffffff", "#d9e2ef", 3)
    rounded(d, (136, 132, 724, 384), 18, "#0f172a")
    rounded(d, (165, 165, 695, 350), 14, "#f8fafc")
    d.rectangle((250, 420, 610, 454), fill="#cbd5e1")
    rounded(d, (190, 448, 680, 476), 14, "#94a3b8")

    # Screen content: roadmap tree.
    d.text((195, 192), "SE Career Compass", fill="#0f172a", font=font(28, True))
    d.text((198, 230), "Personalized roadmap for internships", fill="#475569", font=font(18))
    nodes = [
        ((230, 294), "Core CS", "#2563eb"),
        ((390, 264), "Cloud", "#059669"),
        ((550, 294), "Portfolio", "#7c3aed"),
        ((390, 334), "Mentor", "#dc2626"),
    ]
    for (x, y), label, color in nodes:
        d.line((390, 304, x, y), fill="#94a3b8", width=3)
    for (x, y), label, color in nodes:
        rounded(d, (x - 62, y - 24, x + 62, y + 24), 15, color)
        d.text((x - 44, y - 10), label, fill="#ffffff", font=font(17, True))

    # Right career cards.
    rounded(d, (820, 88, 1100, 178), 20, "#ffffff", "#d9e2ef", 3)
    rounded(d, (850, 116, 898, 154), 12, "#dbeafe")
    d.text((918, 112), "Cloud Architect", fill="#0f172a", font=font(23, True))
    d.text((918, 142), "82% role readiness", fill="#2563eb", font=font(17, True))

    rounded(d, (820, 216, 1100, 306), 20, "#ffffff", "#d9e2ef", 3)
    rounded(d, (850, 242, 898, 280), 12, "#dcfce7")
    d.text((918, 240), "Data Engineer", fill="#0f172a", font=font(23, True))
    d.text((918, 270), "6 urgent gaps", fill="#059669", font=font(17, True))

    rounded(d, (820, 344, 1100, 434), 20, "#ffffff", "#d9e2ef", 3)
    rounded(d, (850, 370, 898, 408), 12, "#fef3c7")
    d.text((918, 368), "Mobile Developer", fill="#0f172a", font=font(23, True))
    d.text((918, 398), "3 portfolio projects", fill="#b45309", font=font(17, True))

    img.save(ASSETS / "career-compass-banner.png", quality=95)


def avatar(filename, initials, fill, accent):
    img = Image.new("RGBA", (320, 320), (255, 255, 255, 0))
    d = ImageDraw.Draw(img)
    rounded(d, (18, 18, 302, 302), 44, fill)
    d.ellipse((88, 58, 232, 202), fill="#ffffff")
    d.ellipse((112, 86, 208, 182), fill=accent)
    rounded(d, (66, 202, 254, 278), 34, "#ffffff")
    d.text((111, 226), initials, fill=accent, font=font(46, True))
    img.save(ASSETS / filename)


if __name__ == "__main__":
    ASSETS.mkdir(exist_ok=True)
    banner()
    avatar("student-avatar.png", "SE", "#dbeafe", "#2563eb")
    avatar("mentor-avatar.png", "IM", "#dcfce7", "#047857")
    avatar("counselor-avatar.png", "AC", "#fef3c7", "#b45309")
