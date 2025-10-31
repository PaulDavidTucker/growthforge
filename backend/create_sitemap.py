# generate-sitemap.py
import os
import django
from datetime import date
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom


BASE_URL = 'https://repsandrevenue.com'
OUTPUT_FILE = 'frontend/public/sitemap.xml'

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'growthsource.settings')
# Set the DJANGO_ALLOW_ASYNC_UNSAFE for this script context
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()

from blog.models import Post
from casestudies.models import CaseStudy

def generate_sitemap():
    print("--- Starting sitemap generation ---")

    static_paths = [
        '/',
        '/about',
        '/packages',
        '/case-studies',
        '/blog',
        '/contact',
    ]

    print("Fetching dynamic URLs from the database...")

    blog_posts = Post.objects.filter(published=True)
    blog_paths = [f'/blog/{post.slug}' for post in blog_posts]
    print(f"Found {len(blog_paths)} published blog posts.")

    case_studies = CaseStudy.objects.all()
    case_study_paths = [f'/case-studies/{study.id}' for study in case_studies]
    print(f"Found {len(case_study_paths)} case studies.")

    # Combine all paths
    all_paths = static_paths + blog_paths + case_study_paths

    print("Building XML structure...")
    urlset = Element('urlset', xmlns='http://www.sitemaps.org/schemas/sitemap/0.9')

    for path in all_paths:
        url_element = SubElement(urlset, 'url')

        loc = SubElement(url_element, 'loc')
        loc.text = f"{BASE_URL}{path}"

        lastmod = SubElement(url_element, 'lastmod')
        lastmod.text = date.today().isoformat()

    xml_str = tostring(urlset, 'utf-8')
    pretty_xml_str = minidom.parseString(xml_str).toprettyxml(indent="  ")

    with open(OUTPUT_FILE, 'w') as f:
        f.write(pretty_xml_str)

    print(f"--- Sitemap successfully generated at {OUTPUT_FILE} ---")

if __name__ == "__main__":
    generate_sitemap()
