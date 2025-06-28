from PIL import Image, ImageDraw, ImageFont

with open("test-result.txt", "r") as f:
    text = f.read()

img = Image.new("RGB", (500, 500), color=(255, 255, 255))
draw = ImageDraw.Draw(img)
font = ImageFont.load_default()
draw.multiline_text((10, 10), text, fill=(0, 0, 0), font=font)
img.save("test-result-all-tasks.jpg")
